import { FileHelper } from '@helpers/FileHelper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FileRepository } from '../repositories/FileRepository';
import { EditUploadFileModel } from '@core/domain/models/EditFileDataModel';

@Injectable()
export class EditUploadFileUseCase {
  constructor(private repository: FileRepository) {}

  async execute({ id, file, filePath, size }: EditUploadFileModel) {
    const fileExists = await this.repository.findById(id);

    if (!fileExists) {
      throw new NotFoundException('Not found!');
    }

    if (fileExists.filePath === null || fileExists.filePath === '') {
      return await this.repository.save({
        id,
        file,
        filePath,
        size,
        createdAt: fileExists.createdAt,
        updatedAt: new Date(),
      });
    } else {
      await FileHelper.removeFile(fileExists.filePath);

      return await this.repository.save({
        id,
        file,
        filePath,
        size,
        createdAt: fileExists.createdAt,
        updatedAt: new Date(),
      });
    }
  }
}
