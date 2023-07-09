import { File } from '@core/domain/entities/File';

export class FileViewModel {
  static toHTTP(data: File) {
    return {
      id: data.id,
      file: data.file,
      filePath: data.filePath,
      size: data.size,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
