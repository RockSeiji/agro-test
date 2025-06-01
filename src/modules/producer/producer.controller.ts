import { Controller, Post, Get, Body, Put, Param, Delete } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { CreateProducerDto } from './dtos/create-producer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProducerDto } from './dtos/update-producer.dto';

@ApiTags('Produtores Rurais')
@Controller('producers')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @ApiOperation({
    summary: 'Incluir Novo Produtor Rural',
    description: 'Registra um novo produtor rural na base de dados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Produtor Rural adicionado.'
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
  create(@Body() data: CreateProducerDto) {
    return this.producerService.create(data);
  }

  @ApiOperation({
    summary: 'Atualizar Produtor Rural',
    description: 'Registra um novo produtor rural na base de dados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Produtor Rural atualizado.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de negócio.'
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  @Put('put/:id')
  update(@Param('id') id: string, @Body() data: UpdateProducerDto) {
    return this.producerService.update(id, data);
  }

  @ApiOperation({
    summary: 'Deletar Produtor Rural',
    description: 'Deleta produtor rural na base de dados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Produtor Rural deletado.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de negócio.'
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.producerService.remove(id);
  }

  @ApiOperation({
    summary: 'Buscar Produtores Rurais',
    description: 'Recupera todos os Produtores Rurais na base de dados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Produtores Rurais encontrados.'
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
    return this.producerService.findAll();
  }
}
