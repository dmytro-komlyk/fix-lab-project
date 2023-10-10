import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested
} from 'class-validator';

import { MetadataDto } from 'shared/metadata.dto';

export class UpdateIssueDto {
  @ApiProperty({
    example: 'diagnostic',
    description: 'Issue URL'
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly slug?: string;

  @ApiProperty({
    example: 'Diagnostic',
    description: 'Issue title'
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60, {
    message: 'title required to be 1-60 symbols length'
  })
  readonly title?: string;

  @ApiProperty({
    example: '["651c7fafb8f1268ad2156521"]',
    description: 'Benefits id'
  })
  @IsOptional()
  @IsDefined()
  @IsArray()
  readonly benefits?: string[];

  @ApiProperty({
    example: '"651c7fafb8f1268ad2156521"',
    description: 'Image id'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly image?: string;

  @ApiProperty({
    example: 'Diagnostic...',
    description: 'Issue description'
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly description?: string;

  @ApiProperty({
    example: false,
    description: 'If false, will not appear on client side lists'
  })
  @IsOptional()
  @IsBoolean({ message: 'field must be a boolean' })
  readonly isActive?: boolean;

  @ApiProperty({
    example: 'від 200 грн',
    description: 'Issue fix price'
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 30, {
    message: 'title required to be 1-30 symbols length'
  })
  readonly price?: string;

  @ApiProperty({
    example: 'Diagnostic...',
    description: 'Issue description'
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly info?: string;

  @ApiProperty({
    type: MetadataDto
  })
  @IsOptional()
  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => MetadataDto)
  readonly metadata?: MetadataDto;
}
