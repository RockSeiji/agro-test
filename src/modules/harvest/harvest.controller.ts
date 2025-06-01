import { Controller, Post, Get, Body } from '@nestjs/common';
import { HarvestService } from './harvest.service';
import { CreateHarvestDto } from './dtos/create-harvest.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Safras')
@Controller('harvests')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @ApiOperation({
      summary: 'Incluir Nova Safra',
      description: 'Registra uma nova safra na base de dados.',
    })
    @ApiResponse({
      status: 200,
      description: 'Safra adicionada.'
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
  create(@Body() data: CreateHarvestDto) {
    return this.harvestService.create(data);
  }

  @ApiOperation({
    summary: 'Buscar Safras',
    description: 'Recupera todas as Safras na base de dados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Safras encontradas.'
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
    return this.harvestService.findAll();
  }
}
