import { Module } from '@nestjs/common';
import { FileController } from './controller/file.controller';
import { DatabaseModule } from '../database/database.module';
import { EditUploadFileUseCase } from '@application/usecases/EditUploadFileUseCase';
import { ListAllFilesUseCase } from '@application/usecases/ListAllFilesUseCase';
import { RemoveFileFromBaseUseCase } from '@application/usecases/RemoveFileFromBaseUseCase';
import { UploadFileUseCase } from '@application/usecases/UploadFileUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [FileController],
  providers: [
    EditUploadFileUseCase,
    ListAllFilesUseCase,
    RemoveFileFromBaseUseCase,
    UploadFileUseCase,
  ],
})
export class HttpModule {}
