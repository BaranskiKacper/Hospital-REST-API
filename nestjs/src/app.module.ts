import { Module } from '@nestjs/common';
import { AppointmentsModule } from './appointments/appointments.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    AppointmentsModule,
    RegistrationsModule,
    PatientsModule,
    DoctorsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
