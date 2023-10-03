import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ImagedataDto {
  @ApiProperty({ example: 'image path' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly src: string;

  @ApiProperty({ example: 'image alt' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly alt: string;

  @ApiProperty({ example: 'image width' })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly width: number;

  @ApiProperty({ example: 'image height' })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly height: number;
}
