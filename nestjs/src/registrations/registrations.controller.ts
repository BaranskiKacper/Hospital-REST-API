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
import { RegistrationsService } from './registrations.service';
import { RegistrationDTO } from './dtos/registration.dto';
import { CreateRegistrationDTO } from './dtos/create-registration.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Registrations')
@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns a list of registrations',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns error when a developer made a mistake',
  })
  async getAll(): Promise<RegistrationDTO[]> {
    const registrations = await this.registrationsService.getAll();
    return registrations.map<RegistrationDTO>((entity) =>
      RegistrationDTO.fromEntity(entity),
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns a registration',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns error when a developer made a mistake',
  })
  async getOne(@Param('id') id: string): Promise<RegistrationDTO> {
    const registration = await this.registrationsService.getOne(Number(id));
    return RegistrationDTO.fromEntity(registration);
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
  async create(@Body() data: CreateRegistrationDTO): Promise<RegistrationDTO> {
    const registration = await this.registrationsService.create(data);
    return RegistrationDTO.fromEntity(registration);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The registration has been updated',
    type: RegistrationDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Registration not found',
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
    @Body() data: CreateRegistrationDTO,
  ): Promise<RegistrationDTO> {
    const updatedRegistration = await this.registrationsService.update(
      Number(id),
      data,
    );
    return RegistrationDTO.fromEntity(updatedRegistration);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The registration has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Registration not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Returns an error when a developer made a mistake',
  })
  async delete(@Param('id') id: string): Promise<string> {
    await this.registrationsService.delete(Number(id));
    return `Registration with ID ${id} has been successfully deleted.`;
  }
}
