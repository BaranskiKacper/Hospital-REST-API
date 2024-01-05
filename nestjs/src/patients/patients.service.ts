import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PatientEntity } from './entities/patient.entity';
import { CreatePatientDTO } from './dtos/create-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<PatientEntity[]> {
    const patients = await this.prisma.patient.findMany();
    return patients.map(
      (patient) =>
        new PatientEntity(
          patient.id,
          patient.firstName,
          patient.lastName,
          patient.PESEL,
          patient.familyDoctorId,
        ),
    );
  }

  async getOne(id: number): Promise<PatientEntity> {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return new PatientEntity(
      patient.id,
      patient.firstName,
      patient.lastName,
      patient.PESEL,
      patient.familyDoctorId,
    );
  }

  async create(data: CreatePatientDTO): Promise<PatientEntity> {
    const patient = await this.prisma.patient.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        PESEL: data.PESEL,
        familyDoctorId: data.familyDoctorId,
      },
    });

    return new PatientEntity(
      patient.id,
      patient.firstName,
      patient.lastName,
      patient.PESEL,
      patient.familyDoctorId,
    );
  }

  async update(id: number, data: CreatePatientDTO): Promise<PatientEntity> {
    // Check if the patient with the specified ID exists
    const existingPatient = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!existingPatient) {
      throw new NotFoundException(
        `Patient with ID ${id} not found. Update failed.`,
      );
    }

    // Check if the provided familyDoctorId exists in the database
    const doctorExists = await this.prisma.doctor.findUnique({
      where: {
        id: data.familyDoctorId,
      },
    });

    if (!doctorExists) {
      throw new NotFoundException(
        `Doctor with ID ${data.familyDoctorId} not found. Patient update failed.`,
      );
    }

    const updatedPatient = await this.prisma.patient.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        PESEL: data.PESEL,
        familyDoctorId: data.familyDoctorId,
      },
    });

    return new PatientEntity(
      updatedPatient.id,
      updatedPatient.firstName,
      updatedPatient.lastName,
      updatedPatient.PESEL,
      updatedPatient.familyDoctorId,
    );
  }

  async changeLastName(id: number, lastName: string): Promise<PatientEntity> {
    const existingPatient = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!existingPatient) {
      throw new NotFoundException(
        `Patient with ID ${id} not found. LastName update failed.`,
      );
    }

    const updatedPatient = await this.prisma.patient.update({
      where: { id },
      data: {
        lastName: lastName,
      },
    });

    return new PatientEntity(
      updatedPatient.id,
      updatedPatient.firstName,
      updatedPatient.lastName,
      updatedPatient.PESEL,
      updatedPatient.familyDoctorId,
    );
  }

  async delete(id: number): Promise<void> {
    const deletedPatient = await this.prisma.patient.delete({
      where: { id },
    });

    if (!deletedPatient) {
      throw new NotFoundException(
        `Patient with ID ${id} not found. Deletion failed.`,
      );
    }
  }
}
