export class DoctorEntity {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly specialization: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    specialization: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.specialization = specialization;
  }
}
