import { Injectable } from '@nestjs/common';


import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GadgetsService {
  constructor(private prisma: PrismaService) {}

  public async findAll() {
    const test = await this.prisma.gadgets.findMany({
      include: {
        brands: true,
        issues: true,
        icon: true,
        gallery: true
      },
    })
    console.log(test)
      // .find()
      // .populate({ path: 'brands', populate: { path: 'icon' } })
      // .populate({
      //   path: 'issues',
      //   populate: [{ path: 'benefits' }, { path: 'image' }]
      // })
      // .populate({ path: 'icon' })
      // .populate({ path: 'gallery' });
  }

  // public async findActive(): Promise<Gadget[]> {
  //   return await this.gadgetModel
  //     .find({ isActive: true })
  //     .select('-isActive')
  //     .populate({ path: 'icon' })
  //     .populate({ path: 'brands' })
  //     .populate({ path: 'issues' })
  //     .populate({ path: 'gallery' });
  // }

  // public async findOneByQuery(query: UpdateGadgetDto): Promise<Gadget | null> {
  //   return await this.gadgetModel
  //     .findOne(query)
  //     .populate({ path: 'brands', populate: { path: 'icon' } })
  //     .populate({
  //       path: 'issues',
  //       populate: [{ path: 'benefits' }, { path: 'image' }]
  //     })
  //     .populate({ path: 'icon' })
  //     .populate({ path: 'gallery' });
  // }

  // public async findOneById(id: string): Promise<Gadget> {
  //   if (!Types.ObjectId.isValid(id)) {
  //     throw new NotFoundException(`Incorrect ID - ${id}`);
  //   }

  //   const gadget = await this.gadgetModel
  //     .findById(id)
  //     .populate({ path: 'brands', populate: { path: 'icon' } })
  //     .populate({
  //       path: 'issues',
  //       populate: [{ path: 'benefits' }, { path: 'image' }]
  //     })
  //     .populate({ path: 'icon' })
  //     .populate({ path: 'gallery' });

  //   if (!gadget) {
  //     throw new NotFoundException(`Gadget with ID "${id}" was not found`);
  //   }

  //   return gadget;
  // }

  // public async create(dto: CreateGadgetDto): Promise<Gadget> {
  //   const foundGadget = await this.gadgetModel.findOne({ slug: dto.slug });

  //   if (foundGadget) {
  //     throw new BadRequestException(`Gadget with slug "${dto.slug}" already exists`);
  //   }

  //   const createdGadget = await new this.gadgetModel(dto).save();
  //   const gadget = await this.findOneById(createdGadget._id);

  //   return gadget;
  // }

  // public async update(id: string, dto: UpdateGadgetDto): Promise<Gadget | null> {
  //   await this.findOneById(id);

  //   const updatedGadget = await this.gadgetModel
  //     .findByIdAndUpdate(id, dto, {
  //       new: true
  //     })
  //     .populate({ path: 'brands', populate: { path: 'icon' } })
  //     .populate({
  //       path: 'issues',
  //       populate: [{ path: 'benefits' }, { path: 'image' }]
  //     })
  //     .populate({ path: 'icon' })
  //     .populate({ path: 'gallery' });

  //   return updatedGadget;
  // }

  // public async remove(id: string): Promise<string> {
  //   if (!Types.ObjectId.isValid(id)) {
  //     throw new NotFoundException(`Incorrect ID - ${id}`);
  //   }

  //   const gadget = await this.gadgetModel.findByIdAndDelete(id);

  //   if (!gadget) {
  //     throw new NotFoundException(`Gadget with ID ${id} was not found`);
  //   }

  //   return id;
  // }
}
