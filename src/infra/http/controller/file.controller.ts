import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileHelper } from '@helpers/FileHelper';
import { FileViewModel } from '../view/file.view.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileUseCase } from '@application/usecases/UploadFileUseCase';
import { ListAllFilesUseCase } from '@application/usecases/ListAllFilesUseCase';
import { EditUploadFileUseCase } from '@application/usecases/EditUploadFileUseCase';
import { RemoveFileFromBaseUseCase } from '@application/usecases/RemoveFileFromBaseUseCase';

@Controller('')
export class FileController {
  constructor(
    private editFileDataUseCase: EditUploadFileUseCase,
    private listAllFilesUseCase: ListAllFilesUseCase,
    private removeFileFromBaseUseCase: RemoveFileFromBaseUseCase,
    private uploadFileUseCase: UploadFileUseCase,
  ) {}

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

    const data = await this.uploadFileUseCase.execute({
      file: filename,
      filePath: path,
      size: size,
    });

    return { file: FileViewModel.toHTTP(data) };
  }
}
