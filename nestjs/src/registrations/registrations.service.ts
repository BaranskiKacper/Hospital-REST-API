import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegistrationEntity } from './entities/registration.entity';
import { CreateRegistrationDTO } from './dtos/create-registration.dto';

@Injectable()
export class RegistrationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<RegistrationEntity[]> {
    const registrations = await this.prisma.registration.findMany();
    return registrations.map(
      (registration) =>
        new RegistrationEntity(
          registration.id,
          registration.patientId,
          registration.registrationDate,
        ),
    );
  }

  async getOne(id: number): Promise<RegistrationEntity> {
    const registration = await this.prisma.registration.findUnique({
      where: { id },
    });
    if (!registration) {
      throw new NotFoundException(`Registration with ID ${id} not found.`);
    }
    return new RegistrationEntity(
      registration.id,
      registration.patientId,
      registration.registrationDate,
    );
  }

  async create(data: CreateRegistrationDTO): Promise<RegistrationEntity> {
    // Check if the provided patientId exists in the database
    const patientExists = await this.prisma.patient.findUnique({
      where: {
        id: data.patientId,
      },
    });

    if (!patientExists) {
      throw new NotFoundException(
        `Patient with ID ${data.patientId} not found. Registration creation failed.`,
      );
    }

    // Create the registration with a valid patientId (do not provide an 'id' field)
    const registration = await this.prisma.registration.create({
      data: {
        patientId: data.patientId,
        registrationDate: data.registrationDate,
      },
    });

    return new RegistrationEntity(
      registration.id,
      registration.patientId,
      registration.registrationDate,
    );
  }

  async update(
    id: number,
    data: CreateRegistrationDTO,
  ): Promise<RegistrationEntity> {
    // Check if the registration with the specified ID exists
    const existingRegistration = await this.prisma.registration.findUnique({
      where: { id },
    });

    if (!existingRegistration) {
      throw new NotFoundException(
        `Registration with ID ${id} not found. Update failed.`,
      );
    }

    // Update the registration with a valid patientId
    const updatedRegistration = await this.prisma.registration.update({
      where: { id },
      data: {
        patientId: data.patientId,
        registrationDate: data.registrationDate,
      },
    });

    return new RegistrationEntity(
      updatedRegistration.id,
      updatedRegistration.patientId,
      updatedRegistration.registrationDate,
    );
  }

  async delete(id: number): Promise<string> {
    // Check if the registration with the specified ID exists
    const existingRegistration = await this.prisma.registration.findUnique({
      where: { id },
    });

    if (!existingRegistration) {
      throw new NotFoundException(
        `Registration with ID ${id} not found. Deletion failed.`,
      );
    }

    await this.prisma.registration.delete({
      where: { id },
    });

    return `Registration with ID ${id} has been successfully deleted.`;
  }
}
