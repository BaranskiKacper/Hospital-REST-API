import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDTO {
  @ApiProperty({
    example: 'John',
    description: 'First name of the doctor',
  })
  readonly firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the doctor',
  })
  readonly lastName: string;

  @ApiProperty({
    example: 'Cardiology',
    description: 'Specialization of the doctor',
  })
  readonly specialization: string;

  constructor(firstName: string, lastName: string, specialization: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.specialization = specialization;
  }
}
