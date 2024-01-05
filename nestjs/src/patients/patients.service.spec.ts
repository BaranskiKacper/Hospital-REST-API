import { PatientsService } from './patients.service';
import { PrismaService } from '../prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';

describe('PatientsService', () => {
    let patientsService: PatientsService;

    const mockPrismaService = {
        patient: {
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

        patientsService = module.get<PatientsService>(PatientsService);
    });


    describe('getAll', () => {
        it('should return empty list when prisma findMany returns an empty list', async () => {
            // Arrange
            mockPrismaService.patient.findMany = jest.fn().mockReturnValueOnce([]);

            // Act
            const patients = await patientsService.getAll();

            // Assert
            expect(patients).toHaveLength(0);
        });

        it('should return patient having proper id', async () => {
            // Arrange
            const patientId = 'c56b7d18-1d32-4b8a-9d76-3f91cd2df6cd';
            mockPrismaService.patient.findMany = jest
                .fn()
                .mockReturnValueOnce([{ id: patientId }]);

            // Act
            const patients = await patientsService.getAll();

            // Assert
            expect(patients).toHaveLength(1);
            expect(patients[0].id).toEqual(patientId);
        });
    });
});
