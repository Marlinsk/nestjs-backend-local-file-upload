import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { FileRepository } from './repositories/file.repository';

@Module({
  providers: [PrismaService, FileRepository],
  exports: [PrismaService, FileRepository],
})
export class PrismaModule {}
