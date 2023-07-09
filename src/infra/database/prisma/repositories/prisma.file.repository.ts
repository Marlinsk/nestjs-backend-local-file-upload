import { Injectable } from '@nestjs/common';
import { File } from '@core/domain/entities/File';
import { PrismaService } from '../prisma.service';
import { PrismaFileMapper } from '../mappers/prisma.file.mapper';
import { FileRepository } from '@application/repositories/FileRepository';

@Injectable()
export class PrismaFileRepository implements FileRepository {
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

  async findAll(): Promise<File[] | null> {
    const file = await this.prisma.file.findMany();

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
