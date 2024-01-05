import { DoctorEntity } from '../entities/doctor.entity';

export class DoctorDTO {
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

  // Can be like this too:
  // fromEntity = () => {
  //
  // }
  public static fromEntity(doctor: DoctorEntity): DoctorDTO {
    return new DoctorDTO(
      doctor.id,
      doctor.firstName,
      doctor.lastName,
      doctor.specialization,
    );
  }
}
