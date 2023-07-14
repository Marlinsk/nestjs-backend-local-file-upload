import { Injectable } from '@nestjs/common';
import { File } from '../entities/File';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaFileMapper } from '../prisma/mappers/prisma.file.mapper';

@Injectable()
export class FileRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: File): Promise<File> {
    const raw = PrismaFileMapper.toPrisma(data);

    return await this.prisma.file.create({
      data: raw,
    });
  }

  async save(data: File): Promise<File> {
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

  async findById(id: string): Promise<File | null> {
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
