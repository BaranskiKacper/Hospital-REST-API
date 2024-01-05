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
import { AppointmentsService } from './appointments.service';
import { AppointmentDTO } from './dtos/appointment.dto';
import { CreateAppointmentDTO } from './dtos/create-appointment.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns a list of appointments',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns error when a developer made a mistake',
  })
  async getAll(): Promise<AppointmentDTO[]> {
    const appointments = await this.appointmentsService.getAll();
    return appointments.map<AppointmentDTO>((entity) =>
      AppointmentDTO.fromEntity(entity),
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns an appointment',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns error when a developer made a mistake',
  })
  async getOne(@Param('id') id: string): Promise<AppointmentDTO> {
    const appointment = await this.appointmentsService.getOne(Number(id));
    return AppointmentDTO.fromEntity(appointment);
  }

  @Post()
  @ApiOperation({
    description: 'Create a new appointment',
  })
  @ApiBody({
    type: CreateAppointmentDTO,
    description: 'Data for creating a new appointment',
  })
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
  async create(@Body() data: CreateAppointmentDTO): Promise<AppointmentDTO> {
    const appointment = await this.appointmentsService.create(data);
    return AppointmentDTO.fromEntity(appointment);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The appointment has been updated',
    type: AppointmentDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Appointment not found',
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
    @Body() data: CreateAppointmentDTO,
  ): Promise<AppointmentDTO> {
    const updatedAppointment = await this.appointmentsService.update(
      Number(id),
      data,
    );
    return AppointmentDTO.fromEntity(updatedAppointment); // Use the DTO to map the updated appointment
  }

  @Put(':id/diagnosis')
  @ApiResponse({
    status: 200,
    description: 'The diagnosis for the appointment has been saved',
    type: AppointmentDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Appointment not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Incorrect payload',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns error when a developer made a mistake',
  })
  async saveDiagnosis(
    @Param('id') id: string,
    @Body('diagnosis') diagnosis: string,
  ): Promise<AppointmentDTO> {
    const updatedAppointment = await this.appointmentsService.saveDiagnosis(
      Number(id),
      diagnosis,
    );
    return AppointmentDTO.fromEntity(updatedAppointment);
  }

  @Patch(':id/date')
  @ApiResponse({
    status: 200,
    description: "The appointment's date has been updated",
    type: AppointmentDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Appointment not found',
  })
  async changeAppointmentDate(
    @Param('id') id: string,
    @Body('appointmentDate') newDate: Date,
  ): Promise<AppointmentDTO> {
    const updatedAppointment = await this.appointmentsService.changeDate(
      Number(id),
      newDate,
    );
    return AppointmentDTO.fromEntity(updatedAppointment);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The appointment has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Appointment not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns an error when a developer made a mistake',
  })
  async delete(@Param('id') id: string): Promise<string> {
    return this.appointmentsService.delete(Number(id));
  }
}
