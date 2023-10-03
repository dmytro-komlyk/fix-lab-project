import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Benefit } from './schemas/benefit.schema';

import { CreateBenefitDto } from './dto/create-benefit.dto';
import { UpdateBenefitDto } from './dto/update-benefit.dto';
import { UpdateIconBenefitDto } from './dto/update-icon-benefit.dto';

@Injectable()
export class BenefitsService {
  constructor(
    @InjectModel(Benefit.name) private readonly benefitModel: Model<Benefit>
  ) {}

  public async findAll(): Promise<Benefit[]> {
    return await this.benefitModel.find();
  }

  public async findAllByQuery(query: UpdateBenefitDto): Promise<Benefit[]> {
    return await this.benefitModel.find(query);
  }

  public async findOneById(id: string): Promise<Benefit> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const benefit = await this.benefitModel.findById(id);

    if (!benefit) {
      throw new NotFoundException(`Brand with ID "${id}" was not found`);
    }

    return benefit;
  }

  public async create(dto: CreateBenefitDto): Promise<Benefit> {
    const foundBenefit = await this.benefitModel.findOne({ title: dto.title });

    if (foundBenefit) {
      throw new BadRequestException(
        `Benefit with slug "${dto.title}" already exists`
      );
    }

    const createdBenefit = await new this.benefitModel(dto).save();
    const benefit = await this.findOneById(createdBenefit._id);

    return benefit;
  }

  public async update(id: string, dto: UpdateBenefitDto): Promise<Benefit> {
    await this.findOneById(id);

    const benefit = await this.benefitModel.findByIdAndUpdate(id, dto, {
      new: true
    });

    return benefit;
  }

  public async updateIcon(id: string, dto: UpdateIconBenefitDto): Promise<Benefit> {
    await this.findOneById(id);

    const benefit = await this.benefitModel.findByIdAndUpdate(id, dto, {
      new: true
    });

    return benefit;
  }

  public async remove(id: string): Promise<Benefit> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const benefit = await this.benefitModel.findByIdAndDelete(id);

    if (!benefit) {
      throw new NotFoundException(`Brand with ID ${id} was not found`);
    }

    return benefit;
  }
}
