import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { PrismaService } from '../prisma.service';
import { PatientEntity } from './entities/patient.entity';
import { CreatePatientDTO } from './dtos/create-patient.dto';

describe('PatientsController', () => {
  let patientsController: PatientsController;
  let patientsService: PatientsService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    patientsService = new PatientsService(prismaService);
    patientsController = new PatientsController(patientsService);
  });

  describe('getAll', () => {
    it('should return empty response when service returns an empty list', async () => {
      // Arrange
      const result: PatientEntity[] = [];
      jest
        .spyOn(patientsService, 'getAll')
        .mockImplementation(() => Promise.resolve(result));

      // Act
      const response = await patientsController.getAll();

      // Assert
      expect(response).toEqual(result);
    });

    it('should return proper patient id', async () => {
      // Arrange
      const patientId = 1;
      const result: PatientEntity[] = [
        new PatientEntity(patientId, '', '', '', 1),
      ];
      jest
        .spyOn(patientsService, 'getAll')
        .mockImplementation(() => Promise.resolve(result));

      // Act
      const response = await patientsController.getAll();

      // Assert
      expect(response).toHaveLength(1);
      expect(response[0].id).toEqual(patientId);
    });
  });

  describe('create', () => {
    it('should return id of a created patient', async () => {
      // Arrange
      const patientId = 1;
      const patient = new PatientEntity(patientId, '', '', '12345678900', 1);
      jest
        .spyOn(patientsService, 'create')
        .mockImplementation(() => Promise.resolve(patient));

      // Act
      const payload = new CreatePatientDTO('', '', '', 1);
      const createdPatientDTO = await patientsController.create(payload);

      // Assert
      expect(createdPatientDTO).toBeDefined();
      expect(createdPatientDTO.id).toEqual(patientId);
    });
    it('should throw an error if PESEL is not 11 characters long', async () => {
      // Arrange
      const invalidPesel = '12345'; // Example of an invalid PESEL
      const payload = new CreatePatientDTO('John', 'Doe', invalidPesel, 1);

      jest.spyOn(patientsService, 'create').mockImplementation(() => {
        throw new Error('Invalid PESEL length');
      });

      // Act & Assert
      await expect(patientsController.create(payload)).rejects.toThrow(
        'Invalid PESEL length',
      );

      expect(payload.PESEL.length).not.toBe(11);
    });
  });
  describe('updatePatientSurname', () => {
    it("should update a patient's last name and return the updated patient", async () => {
      // Arrange
      const patientId = 1;
      const newLastName = 'Smith';
      const patient = new PatientEntity(
        patientId,
        'John',
        'Doe',
        '12345678900',
        1,
      );

      jest.spyOn(patientsService, 'changeLastName').mockImplementation(() =>
        Promise.resolve({
          ...patient,
          lastName: newLastName,
        }),
      );

      // Act
      const updatedPatientDTO = await patientsController.updatePatientSurname(
        patientId.toString(),
        newLastName,
      );

      // Assert
      expect(updatedPatientDTO).toBeDefined();
      expect(updatedPatientDTO.lastName).toEqual(newLastName);

      expect(patientsService.changeLastName).toHaveBeenCalledWith(
        patientId,
        newLastName,
      );
    });
  });
});
