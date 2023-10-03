import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  ValidateNested
} from 'class-validator';

import { ImagedataDto } from 'shared/imagedata.dto';

export class UpdateIconBenefitDto {
  @ApiProperty({
    type: ImagedataDto
  })
  @IsOptional()
  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ImagedataDto)
  readonly icon?: ImagedataDto;
}
