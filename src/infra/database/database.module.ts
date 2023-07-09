import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { FileRepository } from '@application/repositories/FileRepository';
import { PrismaFileRepository } from './prisma/repositories/prisma.file.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: FileRepository,
      useClass: PrismaFileRepository,
    },
  ],
  exports: [FileRepository],
})
export class DatabaseModule {}
