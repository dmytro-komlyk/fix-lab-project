import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  NotFoundException,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'decorators/public.decorator';

import { ISuccessDelete } from 'interfaces/success-delete.interface';

import { IssuesService } from './issues.service';

import { Issue } from './schemas/issue.schema';

import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.issues)
@Controller(ROUTES.issues)
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @ApiOperation({
    summary: 'No-auth* find all active Issues'
  })
  @ApiResponse({ status: 200, type: Issue, isArray: true })
  @Get('')
  public async findAll(): Promise<Issue[]> {
    return await this.issuesService.findAllActive();
  }

  @ApiOperation({ summary: 'No-auth* get Gadget by slug' })
  @ApiResponse({ status: 200, type: Issue, isArray: true })
  @ApiResponse({
    status: 404,
    description: 'Issue was not found'
  })
  @Public()
  @Get('find-by-slug/:slug')
  public async findBySlug(@Param('slug') slug: string): Promise<Issue> {
    const issue = await this.issuesService.findOneByQuery({
      slug
    });

    if (!issue) {
      throw new NotFoundException(`Issue with slug "${slug}" was not found`);
    }

    return issue;
  }

  @ApiOperation({ summary: 'get all Issue data' })
  @ApiResponse({ status: 200, type: Issue, isArray: true })
  @Get('/all')
  @Header('Access-Control-Expose-Headers', 'Content-Range')
  @Header('Content-Range', 'posts 0-24/319')
  public async findAllIssues(): Promise<Issue[]> {
    return await this.issuesService.findAll();
  }

  @ApiOperation({ summary: 'get Issue data by ID' })
  @ApiResponse({ status: 200, type: Issue })
  @ApiResponse({ status: 404, description: 'Issue was not found' })
  @Public()
  @Get('/:id')
  public async findIssueById(@Param('id') id: string): Promise<Issue> {
    return await this.issuesService.findOneById(id);
  }

  @ApiOperation({ summary: 'create new Issue' })
  @ApiResponse({ status: 200, type: Issue })
  @ApiResponse({
    status: 400,
    description: 'Incorrect content data'
  })
  @Post('')
  public async createIssue(
    @Body()
    dto: CreateIssueDto
  ): Promise<Issue> {
    return await this.issuesService.create(dto);
  }

  @ApiOperation({ summary: 'update existing Issue by ID' })
  @ApiResponse({ status: 200, type: Issue })
  @ApiResponse({
    status: 404,
    description: 'Issue was not found'
  })
  @Put('/:id')
  public async updateIssue(
    @Param('id') id: string,
    @Body()
    dto: UpdateIssueDto
  ): Promise<Issue> {
    return await this.issuesService.update(id, dto);
  }

  @ApiOperation({
    summary: 'remove permanently Issue by ID'
  })
  @ApiResponse({ status: 204 })
  @ApiResponse({
    status: 404,
    description: 'Issue was not found'
  })
  @Delete('/:id')
  public async remove(@Param('id') id: string): Promise<ISuccessDelete> {
    await this.issuesService.remove(id);

    return { status: 204, result: 'success' };
  }
}
