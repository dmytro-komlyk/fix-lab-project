import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Length
} from 'class-validator';

import { ImagedataDto } from 'shared/imagedata.dto';

export class UpdateBenefitDto {
  @ApiProperty({
    type: ImagedataDto
  })
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => ImagedataDto)
  readonly icon?: ImagedataDto;

  @ApiProperty({
    example: 'Безкоштовна діагностика',
    description: 'Benefit title'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60, {
    message: 'title required to be 1-60 symbols length'
  })
  readonly title?: string;

  @ApiProperty({
    example: false,
    description: 'If false, will not appear on client side lists'
  })
  @IsOptional()
  @IsBoolean({ message: 'field must be a boolean' })
  readonly isActive?: boolean;
}
