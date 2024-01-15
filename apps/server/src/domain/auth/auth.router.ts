import { Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc/trpc.service';
import { UserService } from '../users/users.service';
import { AuthService } from './auth.service';
import { loginSchema, signUpSchema } from './schemas/auth.schema';

@Injectable()
export class AuthRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly usersService: UserService,
    private readonly authService: AuthService
  ) {}

  authRouter = this.trpc.router({
    register: this.trpc.procedure.input(signUpSchema).mutation(async ({ input }) => {
      const { email } = await this.usersService.create({ ...input });
      const item = await this.authService.login({
        email,
        password: input.password
      });
      return { item };
    }),
    login: this.trpc.procedure.input(loginSchema).mutation(async ({ input }) => {
      const item = await this.authService.login({ ...input });
      return { item };
    })
  });
}
