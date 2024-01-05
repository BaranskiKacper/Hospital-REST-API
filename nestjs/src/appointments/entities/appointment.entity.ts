export class AppointmentEntity {
  readonly id: number;
  readonly doctorId: number;
  readonly registrationId: number;
  readonly appointmentType: string;
  readonly appointmentDate: Date;
  readonly duration: number;
  readonly price: number;
  readonly diagnosis: string;

  constructor(
    id: number,
    doctorId: number,
    registrationId: number,
    appointmentType: string,
    appointmentDate: Date,
    duration: number,
    price: number,
    diagnosis: string,
  ) {
    this.id = id;
    this.doctorId = doctorId;
    this.registrationId = registrationId;
    this.appointmentType = appointmentType;
    this.appointmentDate = appointmentDate;
    this.duration = duration;
    this.price = price;
    this.diagnosis = diagnosis;
  }
}
