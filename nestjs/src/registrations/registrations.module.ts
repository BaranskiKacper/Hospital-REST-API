import { Module } from '@nestjs/common';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [RegistrationsController],
  providers: [RegistrationsService, PrismaService],
})
export class RegistrationsModule {}
