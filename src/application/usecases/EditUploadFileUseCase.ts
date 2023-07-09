import { Injectable, NotFoundException } from '@nestjs/common';
import { FileRepository } from '../repositories/FileRepository';
import { EditUploadFileModel } from '@core/domain/models/EditFileDataModel';

@Injectable()
export class EditUploadFileUseCase {
  constructor(private repository: FileRepository) {}

  async execute(data: EditUploadFileModel) {
    const { id, file, filePath, size } = data;
    const fileExists = await this.repository.findById(data.id);

    if (!fileExists) {
      throw new NotFoundException('Not found!');
    }

    const editFile = await this.repository.save({
      id,
      file,
      filePath,
      size,
      createdAt: fileExists.createdAt,
      updatedAt: new Date(),
    });

    return editFile;
  }
}
