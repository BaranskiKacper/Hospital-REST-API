import { PatientEntity } from '../entities/patient.entity';

export class PatientDTO {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly familyDoctorId: number;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    familyDoctorId: number,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.familyDoctorId = familyDoctorId;
  }

  // Can be like this too:
  // fromEntity = () => {
  //
  // }
  public static fromEntity(patient: PatientEntity): PatientDTO {
    return new PatientDTO(
      patient.id,
      patient.firstName,
      patient.lastName,
      patient.familyDoctorId,
    );
  }
}
