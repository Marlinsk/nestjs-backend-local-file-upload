import { File } from '@core/domain/entities/File';

export abstract class FileRepository {
  abstract create(data: File): Promise<File>;
  abstract save(data: File): Promise<File>;
  abstract findById(id: string): Promise<File | null>;
  abstract findAll(): Promise<File[] | null>;
  abstract delete(id: string): Promise<void>;
}
