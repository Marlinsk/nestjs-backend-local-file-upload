import { FileEntity } from '../../entities/File';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaFileMapper } from '../mappers/prisma.file.mapper';

@Injectable()
export class FileRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: FileEntity): Promise<FileEntity> {
    const raw = PrismaFileMapper.toPrisma(data);

    return await this.prisma.file.create({
      data: raw,
    });
  }

  async save(data: FileEntity): Promise<FileEntity> {
    const raw = PrismaFileMapper.toPrisma(data);

    return this.prisma.file.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async findAll(parameter: { page: number; size: number }) {
    const results = await this.prisma.file.findMany({
      skip: (parameter.page - 1) * parameter.size,
      take: Number(parameter.size),
      orderBy: {
        id: 'desc',
      },
    });

    const totalItems = await this.prisma.file.count();

    return { results, totalItems };
  }

  async findById(id: string): Promise<FileEntity | null> {
    const file = await this.prisma.file.findUnique({
      where: {
        id: id,
      },
    });

    if (!file) {
      return null;
    }

    return file;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.file.delete({
      where: { id: id },
    });
  }
}
