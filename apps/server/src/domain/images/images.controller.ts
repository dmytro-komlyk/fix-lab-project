import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ImagesService } from './images.service';

import { imageSchema } from './schemas/image.schema';

import { FileStorageHelper } from '@helpers/file-storage.helper';

import { AddImageDto } from './dto/add-image.dto';

import { ROUTES } from '@constants/routes.constants';

@ApiTags(ROUTES.images)
@Controller(ROUTES.images)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiOperation({
    summary: 'upload icon image',
  })
  @Post('/upload-icon')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: FileStorageHelper('icons'),
    }),
  )
  public async uploadIcon(
    @Body() body: AddImageDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(svg|SVG)' })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<imageSchema> {
    const pictureData = {
      file: file,
      alt: body.alt,
      type: body.type,
    };

    const imageData = await this.imagesService.upload(pictureData);

    return imageData;
  }

  @ApiOperation({
    summary: 'upload picture image',
  })
  @Post('/upload-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: FileStorageHelper('pictures'),
    }),
  )
  public async uploadPicture(
    @Body() body: AddImageDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
  ): Promise<imageSchema> {
    const pictureData = {
      file: file,
      alt: body.alt,
      type: body.type,
    };

    const imageData = await this.imagesService.upload(pictureData);

    return imageData;
  }

  @ApiOperation({
    summary: 'upload blog image',
  })
  @Post('/upload-blog')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: FileStorageHelper('blog'),
    }),
  )
  public async uploadBlog(
    @Body() body: AddImageDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
  ): Promise<imageSchema> {
    const pictureData = {
      file: file,
      alt: body.alt,
      type: body.type,
    };

    const imageData = await this.imagesService.upload(pictureData);

    return imageData;
  }
}
