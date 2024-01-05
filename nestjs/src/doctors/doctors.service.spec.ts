import { DoctorsService } from './doctors.service';
import { PrismaService } from '../prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';

describe('DoctorsService', () => {
  let doctorsService: DoctorsService;

  const mockPrismaService = {
    doctor: {
      findMany: jest.fn().mockResolvedValue([]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    doctorsService = module.get<DoctorsService>(DoctorsService);
  });

  describe('getAll', () => {
    it('should return empty list when prisma findMany returns an empty list', async () => {
      // Arrange
      mockPrismaService.doctor.findMany = jest.fn().mockReturnValueOnce([]);

      // Act
      const doctors = await doctorsService.getAll();

      // Assert
      expect(doctors).toHaveLength(0);
    });

    it('should return doctor having proper id', async () => {
      // Arrange
      const doctorId = 'c56b7d18-1d32-4b8a-9d76-3f91cd2df6cd';
      mockPrismaService.doctor.findMany = jest
        .fn()
        .mockReturnValueOnce([{ id: doctorId }]);

      // Act
      const doctors = await doctorsService.getAll();

      // Assert
      expect(doctors).toHaveLength(1);
      expect(doctors[0].id).toEqual(doctorId);
    });
  });
});
