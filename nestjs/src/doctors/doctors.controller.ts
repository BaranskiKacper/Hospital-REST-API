import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorDTO } from './dtos/doctor.dto';
import { CreateDoctorDTO } from './dtos/create-doctor.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Doctors')
@Controller('doctors') // route prefix
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns a list of doctors',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns error when a developer made a mistake',
  })
  async getAll(): Promise<DoctorDTO[]> {
    const doctors = await this.doctorsService.getAll();
    return doctors.map<DoctorDTO>((entity) => DoctorDTO.fromEntity(entity));
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns a doctor',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns error when a developer made a mistake',
  })
  async getOne(@Param('id') id: string): Promise<DoctorDTO> {
    const doctor = await this.doctorsService.getOne(Number(id));
    return DoctorDTO.fromEntity(doctor);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The doctor has been created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Incorrect payload',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns error when a developer made a mistake',
  })
  async create(@Body() data: CreateDoctorDTO): Promise<DoctorDTO> {
    const doctor = await this.doctorsService.create(data);
    return DoctorDTO.fromEntity(doctor);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The doctor has been updated',
    type: DoctorDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Doctor not found',
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
    @Body() data: CreateDoctorDTO,
  ): Promise<DoctorDTO> {
    const updatedDoctor = await this.doctorsService.update(Number(id), data);
    return DoctorDTO.fromEntity(updatedDoctor);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The doctor has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Doctor not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns an error when a developer made a mistake',
  })
  async delete(@Param('id') id: string): Promise<string> {
    return this.doctorsService.delete(Number(id));
  }
}
