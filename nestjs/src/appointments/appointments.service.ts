import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAppointmentDTO } from './dtos/create-appointment.dto';
import { AppointmentEntity } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<AppointmentEntity[]> {
    const appointments = await this.prisma.appointment.findMany();
    return appointments.map(
      (appointment) =>
        new AppointmentEntity(
          appointment.id,
          appointment.doctorId,
          appointment.registrationId,
          appointment.appointmentType,
          appointment.appointmentDate,
          appointment.duration,
          appointment.price.toNumber(),
          appointment.diagnosis,
        ),
    );
  }

  async getOne(id: number): Promise<AppointmentEntity> {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return new AppointmentEntity(
      appointment.id,
      appointment.doctorId,
      appointment.registrationId,
      appointment.appointmentType,
      appointment.appointmentDate,
      appointment.duration,
      appointment.price.toNumber(),
      appointment.diagnosis,
    );
  }

  async create(data: CreateAppointmentDTO): Promise<AppointmentEntity> {
    // Check if the provided registrationId exists in the database
    const registrationExists = await this.prisma.registration.findUnique({
      where: {
        id: data.registrationId,
      },
    });

    if (!registrationExists) {
      throw new NotFoundException(
        `Registration with ID ${data.registrationId} not found. Appointment creation failed.`,
      );
    }

    // Check if the provided doctorId exists in the database
    const doctorExists = await this.prisma.doctor.findUnique({
      where: {
        id: data.doctorId,
      },
    });

    if (!doctorExists) {
      throw new NotFoundException(
        `Doctor with ID ${data.doctorId} not found. Appointment creation failed.`,
      );
    }

    // Create the appointment with valid registrationId and doctorId
    const appointment = await this.prisma.appointment.create({
      data: {
        doctorId: data.doctorId,
        registrationId: data.registrationId,
        appointmentType: data.appointmentType,
        appointmentDate: data.appointmentDate,
        duration: data.duration,
        price: data.price,
        diagnosis: data.diagnosis,
      },
    });

    return new AppointmentEntity(
      appointment.id,
      appointment.doctorId,
      appointment.registrationId,
      appointment.appointmentType,
      appointment.appointmentDate,
      appointment.duration,
      appointment.price.toNumber(),
      appointment.diagnosis,
    );
  }

  async update(
    id: number,
    data: CreateAppointmentDTO,
  ): Promise<AppointmentEntity> {
    // Check if the appointment with the specified ID exists
    const existingAppointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!existingAppointment) {
      throw new NotFoundException(
        `Appointment with ID ${id} not found. Update failed.`,
      );
    }

    // Check if the provided registrationId exists in the database
    const registrationExists = await this.prisma.registration.findUnique({
      where: {
        id: data.registrationId,
      },
    });

    if (!registrationExists) {
      throw new NotFoundException(
        `Registration with ID ${data.registrationId} not found. Update failed.`,
      );
    }

    // Check if the provided doctorId exists in the database
    const doctorExists = await this.prisma.doctor.findUnique({
      where: {
        id: data.doctorId,
      },
    });

    if (!doctorExists) {
      throw new NotFoundException(
        `Doctor with ID ${data.doctorId} not found. Update failed.`,
      );
    }

    // Update the appointment with valid registrationId and doctorId
    const updatedAppointment = await this.prisma.appointment.update({
      where: { id },
      data: {
        doctorId: data.doctorId,
        registrationId: data.registrationId,
        appointmentType: data.appointmentType,
        appointmentDate: data.appointmentDate,
        duration: data.duration,
        price: data.price,
        diagnosis: data.diagnosis,
      },
    });

    return new AppointmentEntity(
      updatedAppointment.id,
      updatedAppointment.doctorId,
      updatedAppointment.registrationId,
      updatedAppointment.appointmentType,
      updatedAppointment.appointmentDate,
      updatedAppointment.duration,
      updatedAppointment.price.toNumber(),
      updatedAppointment.diagnosis,
    );
  }

  async saveDiagnosis(
    id: number,
    diagnosis: string,
  ): Promise<AppointmentEntity> {
    const existingAppointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!existingAppointment) {
      throw new NotFoundException(
        `Appointment with ID ${id} not found. Update failed.`,
      );
    }

    const updatedAppointment = await this.prisma.appointment.update({
      where: { id },
      data: {
        diagnosis: diagnosis,
      },
    });

    return new AppointmentEntity(
      updatedAppointment.id,
      updatedAppointment.doctorId,
      updatedAppointment.registrationId,
      updatedAppointment.appointmentType,
      updatedAppointment.appointmentDate,
      updatedAppointment.duration,
      updatedAppointment.price.toNumber(),
      updatedAppointment.diagnosis,
    );
  }

  async changeDate(id: number, newDate: Date): Promise<AppointmentEntity> {
    const existingAppointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!existingAppointment) {
      throw new NotFoundException(
        `Appointment with ID ${id} not found. Date change failed.`,
      );
    }

    const updatedAppointment = await this.prisma.appointment.update({
      where: { id },
      data: {
        appointmentDate: newDate,
      },
    });

    return new AppointmentEntity(
      updatedAppointment.id,
      updatedAppointment.doctorId,
      updatedAppointment.registrationId,
      updatedAppointment.appointmentType,
      updatedAppointment.appointmentDate,
      updatedAppointment.duration,
      updatedAppointment.price.toNumber(),
      updatedAppointment.diagnosis,
    );
  }

  async delete(id: number): Promise<string> {
    // Check if the appointment exists
    const existingAppointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!existingAppointment) {
      throw new NotFoundException(
        `Appointment with ID ${id} not found. Deletion failed.`,
      );
    }

    await this.prisma.appointment.delete({
      where: { id },
    });

    return `Appointment with ID ${id} has been successfully deleted.`;
  }
}
