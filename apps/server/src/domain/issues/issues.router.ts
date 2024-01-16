import { Injectable } from '@nestjs/common';

import z from 'zod';

import { TrpcService } from '../trpc/trpc.service';
import { IssuesService } from './issues.service';

import {
  createIssueSchema,
  outputIssueSchema,
  updateIssueSchema
} from './schemas/issue.schema';

@Injectable()
export class IssuesRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly issuesService: IssuesService
  ) {}

  issuesRouter = this.trpc.router({
    getAllIssues: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllIssues',
          tags: ['issues'],
          summary: 'Read all issues'
        }
      })
      .input(z.void())
      .output(z.array(outputIssueSchema))
      .query(async () => {
        return await this.issuesService.findAll();
      }),
    getAllPublishedIssues: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllPublishedIssues',
          tags: ['issues'],
          summary: 'Read all published issues'
        }
      })
      .input(z.void())
      .output(z.array(outputIssueSchema))
      .query(async () => {
        return await this.issuesService.findAllActive();
      }),
    getByIdIssue: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getByIdIssue',
          tags: ['issues'],
          summary: 'Read a issue by id'
        }
      })
      .input(z.object({ id: z.string() }))
      .output(outputIssueSchema)
      .mutation(async ({ input }) => {
        return await this.issuesService.findById(input.id);
      }),
    getBySlugIssue: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getBySlugIssue',
          tags: ['issues'],
          summary: 'Read a issue by slug'
        }
      })
      .input(z.object({ slug: z.string() }))
      .output(outputIssueSchema)
      .query(async ({ input }) => {
        return await this.issuesService.findBySlug(input.slug);
      }),
    createIssue: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/createIssue',
          tags: ['issues'],
          summary: 'Create a new issue'
        }
      })
      .input(createIssueSchema)
      .output(outputIssueSchema)
      .mutation(async ({ input }) => {
        return await this.issuesService.create({ ...input });
      }),
    updateIssue: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/updateIssue',
          tags: ['issues'],
          summary: 'Update issue'
        }
      })
      .input(updateIssueSchema)
      .output(outputIssueSchema)
      .mutation(async ({ input }) => {
        return await this.issuesService.update(input);
      }),
    removeIssue: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/removeIssue',
          tags: ['issues'],
          summary: 'Delete issue'
        }
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        const id = await this.issuesService.remove(input.id);
        return { id };
      })
  });
}
