import { Injectable } from '@nestjs/common';
import z from 'zod';
import { TrpcService } from '../trpc/trpc.service';
import { createUserSchema } from './schemas/user.schema';
import { UserService } from './users.service';

@Injectable()
export class UserRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly usersService: UserService
  ) {}

  usersRouter = this.trpc.router({
    getByIdUser: this.trpc.procedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        const item = await this.usersService.findById(input.id);
        return { item };
      }),

    getByEmailUser: this.trpc.procedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input }) => {
        const item = await this.usersService.findByEmail(input.email);
        return { item };
      }),

    createUser: this.trpc.procedure
      .input(createUserSchema)
      .mutation(async ({ input }) => {
        const item = await this.usersService.create({ ...input });
        return { item };
      })
  });
}
