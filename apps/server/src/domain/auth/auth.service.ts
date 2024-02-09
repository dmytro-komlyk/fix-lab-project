import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { expiresInToMilliseconds } from '@server/helpers/time-converted.helper';
import { sendEmail } from '@server/utils/email/sendEmail';
import { TRPCError } from '@trpc/server';
import { compare, hash } from 'bcryptjs';
import { randomBytes } from 'crypto';
import { PrismaService } from './../prisma/prisma.service';
import {
  loginSchema,
  outputAuthSchema,
  tokenSchema,
} from './schemas/auth.schema';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async login(data: loginSchema): Promise<outputAuthSchema> {
    const { id, ...userData } = await this.validateUser(data);

    const payload = {
      sub: id,
    };
    const accessToken = await this.refreshToken(payload);

    const { name, email, token } = await this.prisma.user.update({
      where: { email: userData.email },
      data: {
        ...userData,
        ...accessToken,
      },
    });

    return { id, name, email, token, ...accessToken };
  }

  async signUp(userData: outputAuthSchema): Promise<outputAuthSchema> {
    const { id, ...restUserData } = userData;
    const token = await this.jwt.signAsync(
      { id: id },
      {
        secret: process.env.JWT_SECRET_KEY,
      },
    );

    return await this.prisma.user.update({
      where: { id: id },
      data: {
        ...restUserData,
        token,
      },
    });
  }

  async requestPasswordReset(email: string): Promise<{ link: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new TRPCError({
        message: `User with email ${email} was not found`,
        code: 'NOT_FOUND',
      });
    }

    const resetToken = randomBytes(32).toString('hex');
    const token = await this.prisma.token.findFirst({
      where: {
        user_id: user.id,
      },
    });
    if (token)
      await this.prisma.token.delete({ where: { id: token.id } }).catch(() => {
        throw new TRPCError({
          message: `Token with ID ${token.id} was not found`,
          code: 'NOT_FOUND',
        });
      });
    const hashedToken = await hash(resetToken, 10);

    await this.prisma.token.create({
      data: { user_id: user.id, token: hashedToken },
    });

    const link = `${process.env.APP_ADMIN_URL}/authentication/reset-password?token=${resetToken}&id=${user.id}`;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      payload: {
        name: user.name,
        link: link,
      },
      template: '/templates/requestResetPassword.handlebars',
    });
    return { link };
  }

  async resetPassword({
    userId,
    token,
    password,
  }: {
    userId: string;
    token: string;
    password: string;
  }): Promise<{ success: boolean }> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new TRPCError({
        message: `Userr with ID ${userId} was not found`,
        code: 'NOT_FOUND',
      });
    }
    const { id, ...restUser } = user;
    const passwordResetToken = await this.prisma.token.findFirst({
      where: { user_id: id },
    });
    if (!passwordResetToken) {
      throw new TRPCError({
        message: 'Invalid or expired password reset token',
        code: 'NOT_FOUND',
      });
    }
    const isValid = await compare(token, passwordResetToken.token);
    if (!isValid) {
      throw new TRPCError({
        message: 'Invalid or expired password reset token',
        code: 'NOT_FOUND',
      });
    }

    const hashedPass = await hash(password, Number(10));
    const newData = { ...restUser, password: hashedPass };
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: newData,
    });

    await sendEmail({
      email: updatedUser.email,
      subject: 'Password Reset Successfully',
      payload: {
        name: updatedUser.name,
      },
      template: '/templates/resetPassword.handlebars',
    });

    return { success: true };
  }

  async validateUser(data: loginSchema): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new TRPCError({
        message: `User with email ${data.email} was not found`,
        code: 'NOT_FOUND',
      });
    }

    if (user && (await compare(data.password, user.password as string))) {
      return user;
    }

    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  async refreshToken(payload: { sub: string }): Promise<tokenSchema> {
    return {
      accessToken: await this.jwt.signAsync(payload, {
        expiresIn: '1d',
        secret: process.env.JWT_ACCESS_TOKEN_KEY,
      }),
      accessTokenExpires: expiresInToMilliseconds('1d') as number,
      refreshToken: await this.jwt.signAsync(payload, {
        expiresIn: '7h',
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      }),
    };
  }
}
