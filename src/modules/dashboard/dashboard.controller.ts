import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @ApiOperation({
    summary: 'Buscar Dados para a dashboard',
    description: 'Recupera todos os dados para montar o dashboard na base de dados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados encontradas.'
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
  getSummary() {
    return this.dashboardService.getSummary();
  }
}
