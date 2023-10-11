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

import { GadgetsService } from './gadgets.service';

import { Gadget } from './schemas/gadget.schema';

import { CreateGadgetDto } from './dto/create-gadget.dto';
import { UpdateGadgetDto } from './dto/update-gadget.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.gadgets)
@Controller(ROUTES.gadgets)
export class GadgetsController {
  constructor(private readonly gadetsService: GadgetsService) {}

  @ApiOperation({ summary: 'No-auth* get all Gadgets' })
  @ApiResponse({ status: 200, type: Gadget, isArray: true })
  @Public()
  @Get('')
  public async findAllActiveGadgets(): Promise<Gadget[]> {
    return await this.gadetsService.findAllActive();
  }

  @ApiOperation({ summary: 'No-auth* get Gadget by slug' })
  @ApiResponse({ status: 200, type: Gadget, isArray: true })
  @ApiResponse({
    status: 404,
    description: 'Gadget was not found'
  })
  @Public()
  @Get('find-by-slug/:slug')
  public async findBySlug(@Param('slug') slug: string): Promise<Gadget> {
    const result = await this.gadetsService.findOneByQuery({
      slug
    });

    if (!result) {
      throw new NotFoundException(`Gadget with slug "${slug}" was not found`);
    }

    return result;
  }

  @ApiOperation({ summary: 'get all Gadets data' })
  @ApiResponse({ status: 200, type: Gadget, isArray: true })
  @Get('/all')
  @Header('Access-Control-Expose-Headers', 'Content-Range')
  @Header('Content-Range', 'posts 0-24/319')
  public async findAllGadgets(): Promise<Gadget[]> {
    return await this.gadetsService.findAll();
  }

  @ApiOperation({ summary: 'get Gadget data by ID' })
  @ApiResponse({ status: 200, type: Gadget })
  @ApiResponse({
    status: 404,
    description: 'Gadget was not found'
  })
  @Get('/:id')
  public async findGadgetById(@Param('id') id: string): Promise<Gadget> {
    return await this.gadetsService.findOneById(id);
  }

  @ApiOperation({ summary: 'create new Gadget' })
  @ApiResponse({ status: 200, type: Gadget })
  @ApiResponse({
    status: 400,
    description: 'Incorrect content data'
  })
  @Post('')
  public async createGadget(
    @Body()
    dto: CreateGadgetDto
  ): Promise<Gadget> {
    return await this.gadetsService.create(dto);
  }

  @ApiOperation({ summary: 'update existing Gadget by ID' })
  @ApiResponse({ status: 200, type: Gadget })
  @ApiResponse({
    status: 404,
    description: 'Gadget was not found'
  })
  @Put('/:id')
  public async updateGadget(
    @Param('id') id: string,
    @Body() dto: UpdateGadgetDto
  ): Promise<Gadget> {
    return await this.gadetsService.update(id, dto);
  }

  @ApiOperation({
    summary: 'remove permanently Gadget by ID'
  })
  @ApiResponse({ status: 204 })
  @ApiResponse({
    status: 404,
    description: 'Gadget was not found'
  })
  @Delete('/:id')
  public async removeGadget(@Param('id') id: string): Promise<ISuccessDelete> {
    await this.gadetsService.remove(id);

    return { status: 204, result: 'success' };
  }
}
