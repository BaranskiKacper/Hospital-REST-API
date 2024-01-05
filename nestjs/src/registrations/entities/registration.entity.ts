export class RegistrationEntity {
  readonly id: number;
  readonly patientId: number;
  readonly registrationDate: Date;

  constructor(id: number, patientId: number, registrationDate: Date) {
    this.id = id;
    this.patientId = patientId;
    this.registrationDate = registrationDate;
  }
}
