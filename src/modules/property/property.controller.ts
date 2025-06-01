import { Controller, Post, Get, Body } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Propriedades (Fazendas)')
@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) { }

  @ApiOperation({
    summary: 'Incluir Nova Propriedade',
    description: 'Registra uma nova propriedade na base de dados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Propriedade adicionada.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de negócio.'
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  @Post('add')
  create(@Body() data: CreatePropertyDto) {
    return this.propertyService.create(data);
  }

  @ApiOperation({
    summary: 'Buscar Propriedades',
    description: 'Recupera todas as propriedades na base de dados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Propriedades encontradas.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de negócio.'
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  @Get()
  findAll() {
    return this.propertyService.findAll();
  }
}
