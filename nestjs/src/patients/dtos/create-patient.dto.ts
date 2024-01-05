import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDTO {
  @ApiProperty({
    example: 'Jane',
    description: 'First name of the patient',
  })
  readonly firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the patient',
  })
  readonly lastName: string;

  @ApiProperty({
    example: '12345678901',
    description:
      'PESEL number of the patient (Polish national identification number)',
  })
  readonly PESEL: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the patient’s family doctor',
  })
  readonly familyDoctorId: number;

  constructor(
    firstName: string,
    lastName: string,
    PESEL: string,
    familyDoctorId: number,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.PESEL = PESEL;
    this.familyDoctorId = familyDoctorId;
  }
}
