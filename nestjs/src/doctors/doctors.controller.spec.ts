import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { PrismaService } from '../prisma.service';
import { DoctorEntity } from './entities/doctor.entity';
import { CreateDoctorDTO } from './dtos/create-doctor.dto';
import { NotFoundException } from '@nestjs/common';

describe('DoctorsController', () => {
  let doctorsController: DoctorsController;
  let doctorsService: DoctorsService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    doctorsService = new DoctorsService(prismaService);
    doctorsController = new DoctorsController(doctorsService);
  });

  describe('getAll', () => {
    it('should return empty response when service returns an empty list', async () => {
      // Arrange
      const result: DoctorEntity[] = [];
      jest
        .spyOn(doctorsService, 'getAll')
        .mockImplementation(() => Promise.resolve(result));

      // Act
      const response = await doctorsController.getAll();

      // Assert
      expect(response).toEqual(result);
    });

    it('should return proper doctor id', async () => {
      // Arrange
      const doctorId = 1;
      const result: DoctorEntity[] = [new DoctorEntity(doctorId, '', '', '')];
      jest
        .spyOn(doctorsService, 'getAll')
        .mockImplementation(() => Promise.resolve(result));

      // Act
      const response = await doctorsController.getAll();

      // Assert
      expect(response).toHaveLength(1);
      expect(response[0].id).toEqual(doctorId);
    });
  });

  describe('create', () => {
    it('should return id of a created doctor', async () => {
      // Arrange
      const doctorId = 1;
      const doctor = new DoctorEntity(doctorId, '', '', '');
      jest
        .spyOn(doctorsService, 'create')
        .mockImplementation(() => Promise.resolve(doctor));

      // Act
      const payload = new CreateDoctorDTO('', '', '');
      const createdDoctorDTO = await doctorsController.create(payload);

      // Assert
      expect(createdDoctorDTO).toBeDefined();
      expect(createdDoctorDTO.id).toEqual(doctorId);
    });

    it('should return the specialization of a created doctor', async () => {
      // Arrange
      const specialization = 'internist';
      const doctor = new DoctorEntity(1, '', '', specialization);
      jest
        .spyOn(doctorsService, 'create')
        .mockImplementation(() => Promise.resolve(doctor));

      // Act
      const payload = new CreateDoctorDTO('', '', '');
      const createdDoctorDTO = await doctorsController.create(payload);

      // Assert
      expect(createdDoctorDTO).toBeDefined();
      expect(createdDoctorDTO.specialization).toEqual(specialization);
    });
  });

  describe('delete', () => {
    it('should delete a doctor and return success message', async () => {
      // Arrange
      const doctorId = '1';
      // Mock DoctorsService delete method
      jest
        .spyOn(doctorsService, 'delete')
        .mockImplementation(() =>
          Promise.resolve(
            `Doctor with ID ${doctorId} has been successfully deleted.`,
          ),
        );

      // Act
      const response = await doctorsController.delete(doctorId);

      // Assert
      expect(response).toEqual(
        `Doctor with ID ${doctorId} has been successfully deleted.`,
      );
      // Ensure that DoctorsService delete method was called with the correct argument
      expect(doctorsService.delete).toHaveBeenCalledWith(Number(doctorId));
    });

    it('should throw NotFoundException if doctor not found', async () => {
      // Arrange
      const doctorId = '1';
      // Mock DoctorsService delete method to simulate doctor not found
      jest
        .spyOn(doctorsService, 'delete')
        .mockImplementation(() => Promise.reject(new NotFoundException()));

      // Act and Assert
      await expect(doctorsController.delete(doctorId)).rejects.toThrowError(
        NotFoundException,
      );
      // Ensure that DoctorsService delete method was called with the correct argument
      expect(doctorsService.delete).toHaveBeenCalledWith(Number(doctorId));
    });
  });
});
