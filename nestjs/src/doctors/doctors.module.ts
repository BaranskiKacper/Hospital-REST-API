import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [DoctorsController],
  providers: [DoctorsService, PrismaService],
})
export class DoctorsModule {}
