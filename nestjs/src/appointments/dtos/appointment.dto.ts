import { AppointmentEntity } from '../entities/appointment.entity';

export class AppointmentDTO {
  readonly id: number;
  readonly appointmentType: string;
  readonly appointmentDate: Date;
  readonly diagnosis: string;

  constructor(
    id: number,
    appointmentType: string,
    appointmentDate: Date,
    diagnosis: string,
  ) {
    this.id = id;
    this.appointmentType = appointmentType;
    this.appointmentDate = appointmentDate;
    this.diagnosis = diagnosis;
  }

  // Can be like this too:
  // fromEntity = () => {
  //
  // }
  public static fromEntity(appointment: AppointmentEntity): AppointmentDTO {
    return new AppointmentDTO(
      appointment.id,
      appointment.appointmentType,
      appointment.appointmentDate,
      appointment.diagnosis,
    );
  }
}
