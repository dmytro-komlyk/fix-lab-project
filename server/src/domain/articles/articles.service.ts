import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Article } from './schemas/article.schema';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>
  ) {}

  public async findAll(): Promise<Article[]> {
    return await this.articleModel.find().populate({ path: 'preview' });
  }

  public async findActive(): Promise<Article[]> {
    return await this.articleModel
      .find({ isActive: true })
      .populate({ path: 'preview' });
  }

  public async findOneByQuery(query: UpdateArticleDto): Promise<Article> {
    return await this.articleModel.findOne(query).populate({ path: 'preview' });
  }

  public async findOneById(id: string): Promise<Article> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const article = await this.articleModel
      .findById(id)
      .populate({ path: 'preview' });

    if (!article) {
      throw new NotFoundException(`Article with ID "${id}" was not found`);
    }

    return article;
  }

  public async create(dto: CreateArticleDto): Promise<Article> {
    const foundArticle = await this.articleModel.findOne({ slug: dto.slug });

    if (foundArticle) {
      throw new BadRequestException(
        `Article with slug "${dto.slug}" already exists`
      );
    }

    const createdArticle = await new this.articleModel(dto).save();
    const article = await this.findOneById(createdArticle._id);

    return article;
  }

  public async update(id: string, dto: UpdateArticleDto): Promise<Article> {
    await this.findOneById(id);

    const article = await this.articleModel
      .findByIdAndUpdate(id, dto, {
        new: true
      })
      .populate({ path: 'preview' });

    return article;
  }

  public async remove(id: string): Promise<Article> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const article = await this.articleModel.findByIdAndDelete(id);

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} was not found`);
    }

    return article;
  }
}
