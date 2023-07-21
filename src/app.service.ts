import { FileEntity } from './entities/File';
import { FileHelper } from '@helpers/file.helper';
import { UploadFileModel } from './models/UploadFileModel';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EditUploadFileModel } from './models/EditFileDataModel';
import { FileRepository } from './prisma/repositories/file.repository';

@Injectable()
export class AppService {
  constructor(private repository: FileRepository) {}

  async uploadFile(data: UploadFileModel) {
    const { file, filePath, size } = data;

    const uploadData = new FileEntity({
      file: file,
      filePath: filePath,
      size: size,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const newFile = await this.repository.create(uploadData);

    return newFile;
  }

  async editFile({ id, file, filePath, size }: EditUploadFileModel) {
    const fileExists = await this.repository.findById(id);

    if (!fileExists) {
      throw new NotFoundException('Not found!');
    }

    if (fileExists.filePath === null || fileExists.filePath === '') {
      const data = await this.repository.save({
        id,
        file,
        filePath,
        size,
        createdAt: fileExists.createdAt,
        updatedAt: new Date(),
      });

      return data;
    } else {
      await FileHelper.removeFile(fileExists.filePath);

      const data = await this.repository.save({
        id,
        file,
        filePath,
        size,
        createdAt: fileExists.createdAt,
        updatedAt: new Date(),
      });

      return data;
    }
  }

  async getFile(id: string) {
    const fileExists = await this.repository.findById(id);

    if (!fileExists) {
      throw new NotFoundException('Not found!');
    }

    return fileExists;
  }

  async listAllFiles(page: number, size: number) {
    const { results, totalItems } = await this.repository.findAll({
      page,
      size,
    });

    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      info: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async excludeFile(id: string): Promise<void> {
    const fileExists = await this.repository.findById(id);

    if (!fileExists) {
      throw new NotFoundException('Not found!');
    }

    await FileHelper.removeFile(fileExists.filePath);

    await this.repository.delete(id);
  }
}
