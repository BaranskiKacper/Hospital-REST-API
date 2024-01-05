import { ApiProperty } from '@nestjs/swagger';

export class CreateRegistrationDTO {
  @ApiProperty({
    example: 1,
    description: 'The ID of the patient registering for an appointment',
  })
  readonly patientId: number;

  @ApiProperty({
    example: '2023-11-08T10:00:00Z',
    description: 'The date and time when the registration was made',
  })
  readonly registrationDate: Date;

  constructor(patientId: number, registrationDate: Date) {
    this.patientId = patientId;
    this.registrationDate = registrationDate;
  }
}
