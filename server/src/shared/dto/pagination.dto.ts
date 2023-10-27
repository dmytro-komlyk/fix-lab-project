import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min
} from 'class-validator';

import { SORTING } from 'constants/sort.constants';

export class PaginationDto {
  @ApiProperty({ example: 2 })
  @Transform(({ value }) => parseInt(value))
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly page: number;

  @ApiProperty({ example: 10 })
  @Transform(({ value }) => parseInt(value))
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly limit: number;

  @ApiProperty({ example: 'desc' })
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  @IsIn(SORTING)
  readonly sort?: string;
}
