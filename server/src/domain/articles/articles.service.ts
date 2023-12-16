import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

import { IPaginationAnswer } from 'server/src/shared/interfaces/pagination-answer.interface';

import { PrismaService } from '../prisma/prisma.service';

import { Article } from './schemas/article.schema';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationDto } from 'server/src/shared/dto/pagination.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  public async findWithPagination(
    { page = 1, limit = 1000000, sort = 'desc' }: PaginationDto,
    query: UpdateArticleDto
  ) {
    const result: IPaginationAnswer<Article> = {
      itemsCount: 0,
      totalItems: 0,
      totalPages: 0,
      rangeStart: 0,
      rangeEnd: 0,
      items: []
    };

    const totalArticles = await this.prisma.articles.findMany();

    result.totalItems = totalArticles.length;
    result.totalPages = Math.ceil(totalArticles.length / limit);

    const articles = await this.prisma.articles.findMany({
      orderBy: {},
      // where: {},
      take: limit,
      skip: limit * (page - 1)
    });
    // console.log(result, articles);
    // .find(query)
    // .sort({ updatedAt: sort as SortOrder })
    // .limit(limit)
    // .skip(limit * (page - 1))
    // .populate({ path: 'image' })
    // .select(['-createdAt', '-updatedAt']);

    // result.items = articles;
    // result.itemsCount = articles.length;
    // result.rangeStart = articles.length ? limit * (page - 1) : 0;
    // result.rangeEnd = articles.length ? result.rangeStart + result.itemsCount : 0;

    // return result;
  }

  public async findOneByQuery(query: UpdateArticleDto) {
    return await this.prisma.articles.findUnique({
      where: {
        slug: query.slug
      }
    });
  }

  public async findOneById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const article = await this.prisma.articles.findUnique({
      where: {
        id
      }
    });

    if (!article) {
      throw new NotFoundException(`Article with ID "${id}" was not found`);
    }

    return article;
  }

  public async create(dto: CreateArticleDto) {
    const foundArticle = await this.prisma.articles.findUnique({
      where: {
        slug: dto.slug
      }
    });

    if (foundArticle) {
      throw new BadRequestException(
        `Article with slug "${dto.slug}" already exists`
      );
    }

    const createdArticle = await this.prisma.articles.create({
      data: dto
    });
    const article = await this.findOneById(createdArticle.id);

    return article;
  }

  public async update(id: string, dto: UpdateArticleDto) {
    await this.findOneById(id);

    const article = await this.prisma.articles.update({
      where: { id },
      data: dto,
      include: { image: true }
    });

    return article;
  }

  public async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const article = await this.prisma.articles.delete({ where: { id } });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} was not found`);
    }

    return id;
  }
}
