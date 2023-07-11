import { Injectable } from '@nestjs/common';
import { FileRepository } from '../repositories/FileRepository';

@Injectable()
export class ListAllFilesUseCase {
  constructor(private repository: FileRepository) {}

  async execute(page: number, size: number) {
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
}
