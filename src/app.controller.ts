import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileHelper } from '@helpers/file.helper';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('')
  async listFiles(@Request() request) {
    return await this.service.listAllFiles(
      request.query.hasOwnProperty('page') ? request.query.page : 1,
      request.query.hasOwnProperty('size') ? request.query.size : 16,
    );
  }

  @Get(':id')
  async getFile(@Param('id') id: string) {
    const data = await this.service.getFile(id);
    return { file: data };
  }

  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: FileHelper.randomName,
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { filename, path, size } = file;

    const data = await this.service.uploadFile({
      file: filename,
      filePath: path,
      size: size,
    });

    return { file: data };
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: FileHelper.randomName,
      }),
    }),
  )
  async editFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { filename, path, size } = file;

    const data = await this.service.editFile({
      id,
      file: filename,
      filePath: path,
      size: size,
    });

    return { file: data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.service.excludeFile(id);
  }
}
