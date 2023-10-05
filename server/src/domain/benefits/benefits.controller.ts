import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'decorators/public.decorator';

import { ISuccessDelete } from 'interfaces/success-delete.interface';

import { BenefitsService } from './benefits.service';

import { Benefit } from './schemas/benefit.schema';

import { CreateBenefitDto } from './dto/create-benefit.dto';
import { UpdateBenefitDto } from './dto/update-benefit.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.benefits)
@Controller(ROUTES.benefits)
export class BenefitsController {
  constructor(private readonly benefitsService: BenefitsService) {}

  @ApiOperation({ summary: 'get all active benefits' })
  @ApiResponse({ status: 200, type: Benefit, isArray: true })
  @Public()
  @Get('')
  public async findAllActiveBenefits(): Promise<Benefit[]> {
    return await this.benefitsService.findAllByQuery({ isActive: true });
  }

  @ApiOperation({ summary: 'get Benefits data, auth reqiured*' })
  @ApiResponse({ status: 200, type: Benefit, isArray: true })
  @Get('/all')
  @Header('Access-Control-Expose-Headers', 'Content-Range')
  @Header('Content-Range', 'posts 0-24/319')
  public async findAllBenefits(): Promise<Benefit[]> {
    return await this.benefitsService.findAll();
  }

  @ApiOperation({ summary: 'get Benefit data by ID, auth reqiured*' })
  @ApiResponse({ status: 200, type: Benefit })
  @ApiResponse({ status: 404, description: 'Benefits was not found' })
  @Get('/:id')
  public async findBenefitById(@Param('id') id: string): Promise<Benefit> {
    return await this.benefitsService.findOneById(id);
  }

  @ApiOperation({ summary: 'create new Benefit' })
  @ApiResponse({ status: 200, type: Benefit })
  @ApiResponse({ status: 400, description: 'Incorrect content data' })
  @Post('')
  public async createBenefit(
    @Body()
    dto: CreateBenefitDto
  ): Promise<Benefit> {
    return await this.benefitsService.create(dto);
  }

  @ApiOperation({ summary: 'update existing Benefit by ID' })
  @ApiResponse({ status: 200, type: Benefit })
  @ApiResponse({ status: 404, description: 'Benefit was not found' })
  @Put('/:id')
  public async updateBenefit(
    @Param('id') id: string,
    @Body()
    dto: UpdateBenefitDto
  ): Promise<Benefit> {
    return await this.benefitsService.update(id, dto);
  }

  @ApiOperation({ summary: 'remove permanently Benefit by ID' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Benefit was not found' })
  @Delete('/:id')
  public async removeBenefit(@Param('id') id: string): Promise<ISuccessDelete> {
    await this.benefitsService.remove(id);

    return { status: 204, result: 'success' };
  }
}
