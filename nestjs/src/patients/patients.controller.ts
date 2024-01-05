import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  HttpStatus,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientDTO } from './dtos/patient.dto';
import { CreatePatientDTO } from './dtos/create-patient.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns a list of patients',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns error when a developer made a mistake',
  })
  async getAll(): Promise<PatientDTO[]> {
    const patients = await this.patientsService.getAll();
    return patients.map((patient) => PatientDTO.fromEntity(patient));
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns a patient',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns error when a developer made a mistake',
  })
  async getOne(@Param('id') id: string): Promise<PatientDTO> {
    const patient = await this.patientsService.getOne(Number(id));
    return PatientDTO.fromEntity(patient);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The patient has been created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Incorrect payload',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns error when a developer made a mistake',
  })
  async create(@Body() data: CreatePatientDTO): Promise<PatientDTO> {
    const patient = await this.patientsService.create(data);
    return PatientDTO.fromEntity(patient);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The patient has been updated',
    type: PatientDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Incorrect payload',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns error when a developer made a mistake',
  })
  async update(
    @Param('id') id: string,
    @Body() data: CreatePatientDTO,
  ): Promise<PatientDTO> {
    const updatedPatient = await this.patientsService.update(Number(id), data);
    return PatientDTO.fromEntity(updatedPatient);
  }

  @Patch(':id/lastName')
  @ApiResponse({
    status: 200,
    description: "The patient's last name has been updated",
    type: PatientDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found',
  })
  async updatePatientSurname(
    @Param('id') id: string,
    @Body('lastName') lastName: string,
  ): Promise<PatientDTO> {
    const updatedPatient = await this.patientsService.changeLastName(
      Number(id),
      lastName,
    );
    return PatientDTO.fromEntity(updatedPatient);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The patient has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns an error when a developer made a mistake',
  })
  async delete(@Param('id') id: string): Promise<string> {
    await this.patientsService.delete(Number(id));
    return `Patient with ID ${id} has been successfully deleted.`;
  }
}
