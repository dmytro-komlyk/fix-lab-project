import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { TRPCError, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrpcService {
  constructor(private prisma: PrismaService, private readonly jwt: JwtService) {}
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  decodeAndVerifyJwtToken = async (token: string) => {
    try {
      const decodedToken = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY
      });
      const user = this.prisma.user.findUnique({
        where: {
          id: decodedToken.sub
        }
      });
      return user;
    } catch (error) {
      // Token verification failed
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Error decoding or verifying JWT token'
      });
    }
  };

  getUserFromHeader = async (req: any): Promise<User | null> => {
    if (req.headers.authorization) {
      const user = await this.decodeAndVerifyJwtToken(
        req.headers.authorization.split(' ')[1]
      );
      return user;
    }
    return null;
  };

  createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
    // Create your context based on the request object
    // Will be available as `ctx` in all your resolvers
    // This is just an example of something you might want to do in your ctx fn
    const user = await this.getUserFromHeader(req);
    return {
      user
    };
  };

  trpc = initTRPC.context<Awaited<ReturnType<typeof this.createContext>>>().create();
  protectedProcedure = this.trpc.procedure.use(async function isAuthed(opts) {
    const { ctx } = opts;
    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return opts.next({
      ctx: {
        // ✅ user value is known to be non-null now
        user: ctx.user
        // ^?
      }
    });
  });
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
}
