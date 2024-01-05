import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateDoctorDTO } from './dtos/create-doctor.dto';
import { DoctorEntity } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<DoctorEntity[]> {
    const doctors = await this.prisma.doctor.findMany();
    return doctors.map(
      (doctor) =>
        new DoctorEntity(
          doctor.id,
          doctor.firstName,
          doctor.lastName,
          doctor.specialization,
        ),
    );
  }

  async getOne(id: number): Promise<DoctorEntity> {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    return new DoctorEntity(
      doctor.id,
      doctor.firstName,
      doctor.lastName,
      doctor.specialization,
    );
  }

  async create(data: CreateDoctorDTO): Promise<DoctorEntity> {
    // Create the doctor with the provided data
    const createdDoctor = await this.prisma.doctor.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        specialization: data.specialization,
      },
    });

    // Map the Prisma entity to a DoctorEntity
    return new DoctorEntity(
      createdDoctor.id,
      createdDoctor.firstName,
      createdDoctor.lastName,
      createdDoctor.specialization,
    );
  }

  async update(id: number, data: CreateDoctorDTO): Promise<DoctorEntity> {
    // Check if the doctor with the specified ID exists
    const existingDoctor = await this.prisma.doctor.findUnique({
      where: { id },
    });

    if (!existingDoctor) {
      throw new NotFoundException(
        `Doctor with ID ${id} not found. Update failed.`,
      );
    }

    // Update the doctor with the valid ID
    const updatedDoctor = await this.prisma.doctor.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        specialization: data.specialization,
      },
    });

    return new DoctorEntity(
      updatedDoctor.id,
      updatedDoctor.firstName,
      updatedDoctor.lastName,
      updatedDoctor.specialization,
    );
  }

  async delete(id: number): Promise<string> {
    // Check if the doctor with the specified ID exists
    const existingDoctor = await this.prisma.doctor.findUnique({
      where: { id },
    });

    if (!existingDoctor) {
      throw new NotFoundException(
        `Doctor with ID ${id} not found. Deletion failed.`,
      );
    }

    // Delete the doctor with the valid ID
    await this.prisma.doctor.delete({
      where: { id },
    });

    return `Doctor with ID ${id} has been successfully deleted.`;
  }
}
