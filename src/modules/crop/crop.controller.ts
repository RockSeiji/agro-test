import { Controller, Post, Get, Body } from '@nestjs/common';
import { CropService } from './crop.service';
import { CreateCropDto } from './dtos/create-crop.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Culturas plantadas')
@Controller('crops')
export class CropController {
  constructor(private readonly cropService: CropService) { }

  @ApiOperation({
    summary: 'Incluir Nova Cultura plantada',
    description: 'Registra uma nova Cultura plantada na base de dados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Cultura plantada adicionada.'
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
  create(@Body() data: CreateCropDto) {
    return this.cropService.create(data);
  }

  @ApiOperation({
    summary: 'Buscar Culturas plantadas',
    description: 'Recupera todas as Culturas plantadas na base de dados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Culturas plantadas encontradas.'
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
    return this.cropService.findAll();
  }
}
