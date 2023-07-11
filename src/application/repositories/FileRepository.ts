import { File } from '@core/domain/entities/File';
import { ResultsData } from '@application/@types/ResultData';
import { FindAllParameter } from '@application/@types/FindAllParameter';

export abstract class FileRepository {
  abstract create(data: File): Promise<File>;
  abstract save(data: File): Promise<File>;
  abstract findById(id: string): Promise<File | null>;
  abstract findAll(dto: FindAllParameter): Promise<ResultsData<File>>;
  abstract delete(id: string): Promise<void>;
}
