import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { FileRepository } from './repositories/file.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [AppService, FileRepository],
})
export class AppModule {}
