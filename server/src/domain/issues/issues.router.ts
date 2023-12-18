import { Injectable } from '@nestjs/common';

import z from 'zod';

import { TrpcService } from '../trpc/trpc.service';
import { IssuesService } from './issues.service';

import { createIssueSchema, updateIssueSchema } from './schemas/issue.schema';

@Injectable()
export class IssuesRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly issuesService: IssuesService
  ) {}

  issuesRouter = this.trpc.router({
    getAll: this.trpc.procedure.query(async () => {
      return await this.issuesService.findAll();
    }),
    getAllPublished: this.trpc.procedure.query(async () => {
      return await this.issuesService.findAllActive();
    }),
    getById: this.trpc.procedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        return await this.issuesService.findById(input.id);
      }),
    getBySlug: this.trpc.procedure.input(z.string()).query(async ({ input }) => {
      return await this.issuesService.findBySlug(input);
    }),
    create: this.trpc.procedure
      .input(createIssueSchema)
      .mutation(async ({ input }) => {
        return await this.issuesService.create({ ...input });
      }),
    update: this.trpc.procedure
      .input(updateIssueSchema)
      .mutation(async ({ input }) => {
        return await this.issuesService.update(input);
      }),
    remove: this.trpc.procedure.input(z.string()).mutation(async ({ input }) => {
      return await this.issuesService.remove(input);
    })
  });
}
