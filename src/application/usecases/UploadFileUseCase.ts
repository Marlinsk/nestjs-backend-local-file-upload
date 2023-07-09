import { Injectable } from '@nestjs/common';
import { File } from '@core/domain/entities/File';
import { FileRepository } from '../repositories/FileRepository';
import { UploadFileModel } from '@core/domain/models/UploadFileModel';

@Injectable()
export class UploadFileUseCase {
  constructor(private repository: FileRepository) {}

  async execute(data: UploadFileModel) {
    const { file, filePath, size } = data;

    const uploadData = new File({
      file: file,
      filePath: filePath,
      size: size,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const newFile = await this.repository.create(uploadData);

    return newFile;
  }
}
