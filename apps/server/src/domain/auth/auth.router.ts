import { Injectable } from '@nestjs/common';
import z from 'zod';
import { TrpcService } from '../trpc/trpc.service';
import { UserService } from '../users/users.service';
import { AuthService } from './auth.service';
import {
  loginSchema,
  outputAuthSchema,
  resetPassword,
  signUpSchema,
} from './schemas/auth.schema';

@Injectable()
export class AuthRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}

  authRouter = this.trpc.router({
    register: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/register',
          tags: ['auth'],
          summary: 'Register new user',
        },
      })
      .input(signUpSchema)
      .output(outputAuthSchema)
      .mutation(async ({ input }) => {
        const newUser = await this.usersService.create({ ...input });
        const user = await this.authService.signUp(newUser);
        return await this.authService.login({
          email: user.email,
          password: input.password,
        });
      }),
    login: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/login',
          tags: ['auth'],
          summary: 'Login user',
        },
      })
      .input(loginSchema)
      .output(outputAuthSchema)
      .mutation(async ({ input }) => {
        return await this.authService.login({ ...input });
      }),
    forgetPassword: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/forgetPassword',
          tags: ['auth'],
          summary: 'Reset password',
        },
      })
      .input(z.object({ email: z.string().email() }))
      .output(z.object({ link: z.string().min(1) }))
      .mutation(async ({ input }) => {
        return await this.authService.requestPasswordReset(input.email);
      }),
    resetPassword: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/resetPassword',
          tags: ['auth'],
          summary: 'Reset password',
        },
      })
      .input(resetPassword)
      .output(z.object({ success: z.boolean() }))
      .mutation(async ({ input }) => {
        return await this.authService.resetPassword(input);
      }),
    // refreshToken: this.trpc.procedure
  });
}
