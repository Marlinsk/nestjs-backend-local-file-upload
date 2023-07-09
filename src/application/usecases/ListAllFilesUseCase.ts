import { Injectable } from '@nestjs/common';
import { FileRepository } from '../repositories/FileRepository';

@Injectable()
export class ListAllFilesUseCase {
  constructor(private repository: FileRepository) {}

  async execute() {
    return await this.repository.findAll();
  }
}
