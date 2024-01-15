import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TRPCError } from '@trpc/server';
import { compare } from 'bcrypt';
import { PrismaService } from './../prisma/prisma.service';
import { loginSchema, outputAuthSchema, tokenSchema } from './schemas/auth.schema';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private readonly jwt: JwtService) {}

  async login(data: loginSchema): Promise<tokenSchema> {
    const { id, ...userData } = await this.validateUser(data);

    const payload = {
      sub: id
    };
    const token = await this.refreshToken(payload);

    await this.prisma.user.update({
      where: { email: userData.email },
      data: {
        ...userData,
        ...token
      }
    });

    return token;
  }

  async validateUser(data: loginSchema): Promise<outputAuthSchema> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (!user) {
      throw new TRPCError({
        message: `User with email ${data.email} was not found`,
        code: 'NOT_FOUND'
      });
    }

    if (user && (await compare(data.password, user.password as string))) {
      return user;
    }

    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  async refreshToken(payload: { sub: string }): Promise<tokenSchema> {
    return {
      acessToken: await this.jwt.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET_KEY
      }),
      refreshToken: await this.jwt.signAsync(payload, {
        expiresIn: '7h',
        secret: process.env.JWT_REFRESH_TOKEN_KEY
      })
    };
  }
}
