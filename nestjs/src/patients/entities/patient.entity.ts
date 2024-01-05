export class PatientEntity {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly PESEL: string;
  readonly familyDoctorId: number;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    PESEL: string,
    familyDoctorId: number,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.PESEL = PESEL;
    this.familyDoctorId = familyDoctorId;
  }
}
