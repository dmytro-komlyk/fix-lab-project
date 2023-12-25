import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';

import { PrismaService } from '../prisma/prisma.service';

import { PasswordEncryptHelper } from '@helpers/password-encrypt.helper';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userSchema } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  public async findAll(): Promise<userSchema[]> {
    const users = await this.prisma.user.findMany();

    return users;
  }

  public async findById(id: string): Promise<userSchema> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });

    if (!user) {
      throw new NotFoundException(`User with ${id} was not found!`);
    }

    return user;
  }

  public async findByQuery(query: UpdateUserDto): Promise<userSchema | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: query.email, isActive: query.isActive }
    });

    if (!user) {
      throw new NotFoundException(`User was not found`);
    }

    return user;
  }

  public async findOneWithPassword(login: string): Promise<userSchema | null> {
    return this.prisma.user.findUnique({ where: { login } });
  }

  public async create(dto: CreateUserDto): Promise<userSchema> {
    const errorData = {
      statusCode: 422,
      error: 'Bad Request',
      message: `User already exists`
    };
    const checkedUser = await this.prisma.user.findFirst({
      where: { login: dto.login }
    });

    if (checkedUser) {
      throw new UnprocessableEntityException(errorData);
    }

    const password = await PasswordEncryptHelper(dto.password);

    const createdUser = await this.prisma.user.create({
      data: { ...dto, password, token: '' }
    });

    const user = await this.prisma.user.findFirst({
      where: { login: createdUser.login }
    });

    if (!user) {
      throw new UnprocessableEntityException(errorData);
    }

    return user;
  }

  public async update(id: string, dto: UpdateUserDto): Promise<userSchema> {
    const user = await this.findById(id);

    const password = dto.password
      ? await PasswordEncryptHelper(dto.password)
      : user.password;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { ...dto, password }
    });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} was not found`);
    }

    return updatedUser;
  }

  public async remove(id: string): Promise<string> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const user = await this.prisma.user.delete({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User ID ${id} was not found`);
    }

    return id;
  }

  public async createFirstAdmin(
    key: string,
    dto: CreateUserDto
  ): Promise<userSchema> {
    const originalKey = this.configService.get<string>('D_ADMIN_KEY');
    const users = await this.prisma.user.findMany();

    if (users.length > 0 || key !== originalKey || !originalKey) {
      throw new NotAcceptableException();
    }

    const admin = await this.create(dto);

    if (!admin) {
      throw new UnprocessableEntityException('User was not created! Unvalid DTO');
    }

    return admin;
  }
}
