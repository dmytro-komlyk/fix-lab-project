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

import { BrandsService } from './brands.service';

import { Brand } from './schemas/brand.schema';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.brands)
@Controller(ROUTES.brands)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiOperation({ summary: 'Client: get all active brands' })
  @ApiResponse({ status: 200, type: Brand, isArray: true })
  @Public()
  @Get('')
  public async findAllActiveBrands(): Promise<Brand[]> {
    return await this.brandsService.findAllByQuery({ isActive: true });
  }

  @ApiOperation({ summary: 'Client: get brand by slug' })
  @ApiResponse({ status: 200, type: Brand, isArray: true })
  @Public()
  @Get('find-by-slug/:slug')
  public async findBySlug(@Param('slug') slug: string): Promise<Brand> {
    const result = await this.brandsService.findOneByQuery({ slug });

    if (!result) {
      throw new NotFoundException(`Brand with slug "${slug}" was not found`);
    }

    return result;
  }

  @ApiOperation({ summary: 'get Brands data, auth reqiured*' })
  @ApiResponse({ status: 200, type: Brand, isArray: true })
  @Get('/all')
  @Header('Access-Control-Expose-Headers', 'Content-Range')
  @Header('Content-Range', 'brands 0-24/319')
  public async findAllBrands(): Promise<Brand[]> {
    return await this.brandsService.findAll();
  }

  @ApiOperation({ summary: 'get Brand data by ID, auth reqiured*' })
  @ApiResponse({ status: 200, type: Brand })
  @ApiResponse({ status: 404, description: 'Brands was not found' })
  @Get('/:id')
  public async findBrandById(@Param('id') id: string): Promise<Brand> {
    return await this.brandsService.findOneById(id);
  }

  @ApiOperation({ summary: 'create new Brand' })
  @ApiResponse({ status: 200, type: Brand })
  @ApiResponse({ status: 400, description: 'Incorrect content data' })
  @Post('')
  public async createBrand(
    @Body()
    dto: CreateBrandDto
  ): Promise<Brand> {
    return await this.brandsService.create(dto);
  }

  @ApiOperation({ summary: 'update existing Brand by ID' })
  @ApiResponse({ status: 200, type: Brand })
  @ApiResponse({ status: 404, description: 'Brand was not found' })
  @Put('/:id')
  public async updateBrand(
    @Param('id') id: string,
    @Body()
    dto: UpdateBrandDto
  ): Promise<Brand> {
    return await this.brandsService.update(id, dto);
  }

  @ApiOperation({ summary: 'remove permanently Brand by ID' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Brand was not found' })
  @Delete('/:id')
  public async removeBrand(@Param('id') id: string): Promise<ISuccessDelete> {
    await this.brandsService.remove(id);

    return { status: 204, result: 'success' };
  }
}
