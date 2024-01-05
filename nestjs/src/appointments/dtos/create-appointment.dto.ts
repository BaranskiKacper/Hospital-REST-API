import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDTO {
  @ApiProperty({
    example: 1,
    description: 'ID of the doctor',
  })
  readonly doctorId: number;

  @ApiProperty({
    example: 12345,
    description: 'Registration ID of the patient',
  })
  readonly registrationId: number;

  @ApiProperty({
    enum: ['Checkup', 'Surgery', 'Continuation of treatment'],
    example: 'Checkup',
    description: 'Type of the appointment',
  })
  readonly appointmentType: string;

  @ApiProperty({
    example: '2023-11-08T10:00:00Z',
    description: 'Date and time of the appointment',
  })
  readonly appointmentDate: Date;

  @ApiPropertyOptional({
    example: 30,
    description: 'Duration of the appointment in minutes',
  })
  readonly duration: number;

  @ApiPropertyOptional({
    example: 100,
    description: 'Price of the appointment',
  })
  readonly price: number;
  @ApiProperty({
    example: 'Routine checkup',
    description: 'Diagnosis or reason for the appointment',
  })
  readonly diagnosis: string;

  constructor(
    doctorId: number,
    registrationId: number,
    appointmentType: string,
    appointmentDate: Date,
    duration: number,
    price: number,
    diagnosis: string,
  ) {
    this.doctorId = doctorId;
    this.registrationId = registrationId;
    this.appointmentType = appointmentType;
    this.appointmentDate = appointmentDate;
    this.duration = duration;
    this.price = price;
    this.diagnosis = diagnosis;
  }
}
