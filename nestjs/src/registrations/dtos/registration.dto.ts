import { RegistrationEntity } from '../entities/registration.entity';

export class RegistrationDTO {
  readonly id: number;
  readonly registrationDate: Date;

  constructor(id: number, registrationDate: Date) {
    this.id = id;
    this.registrationDate = registrationDate;
  }

  // Can be like this too:
  // fromEntity = () => {
  //
  // }
  public static fromEntity(registration: RegistrationEntity): RegistrationDTO {
    return new RegistrationDTO(registration.id, registration.registrationDate);
  }
}
