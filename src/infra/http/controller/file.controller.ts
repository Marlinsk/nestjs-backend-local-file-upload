import {
  Controller,
  Post,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  Get,
  Request,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { Helper } from '@helpers/helper';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileUseCase } from '@application/usecases/UploadFileUseCase';
import { ListAllFilesUseCase } from '@application/usecases/ListAllFilesUseCase';
import { EditUploadFileUseCase } from '@application/usecases/EditUploadFileUseCase';
import { RemoveFileFromBaseUseCase } from '@application/usecases/RemoveFileFromBaseUseCase';

@Controller('')
export class FileController {
  constructor(
    private uploadFileUseCase: UploadFileUseCase,
    private listAllFilesUseCase: ListAllFilesUseCase,
    private editFileDataUseCase: EditUploadFileUseCase,
    private removeFileFromBaseUseCase: RemoveFileFromBaseUseCase,
  ) {}

  @Get('')
  async listFiles(@Request() request) {
    return await this.listAllFilesUseCase.execute(
      request.query.hasOwnProperty('page') ? request.query.page : 1,
      request.query.hasOwnProperty('size') ? request.query.size : 16,
    );
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: Helper.randomName,
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { filename, path, size } = file;

    const data = await this.uploadFileUseCase.execute({
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
        filename: Helper.randomName,
      }),
    }),
  )
  async editFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { filename, path, size } = file;

    const data = await this.editFileDataUseCase.execute({
      id,
      file: filename,
      filePath: path,
      size: size,
    });

    return { file: data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.removeFileFromBaseUseCase.execute(id);
  }
}
