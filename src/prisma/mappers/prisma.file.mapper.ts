import { File as RawFile } from '@prisma/client';
import { File } from '../../entities/File';

export class PrismaFileMapper {
  static toPrisma(data: File) {
    return {
      id: data.id,
      file: data.file,
      filePath: data.filePath,
      size: data.size,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toDomain(raw: RawFile): File {
    return new File({
      id: raw.id,
      file: raw.file,
      filePath: raw.filePath,
      size: raw.size,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
