import { Injectable, NotFoundException } from '@nestjs/common';
import { FileRepository } from '../repositories/FileRepository';

@Injectable()
export class RemoveFileFromBaseUseCase {
  constructor(private repository: FileRepository) {}

  async execute(id: string): Promise<void> {
    const fileExists = await this.repository.findById(id);

    if (!fileExists) {
      throw new NotFoundException('Not found!');
    }

    await this.repository.delete(id);
  }
}
