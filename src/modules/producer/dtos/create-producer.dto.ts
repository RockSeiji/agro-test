import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProducerDto {
  @ApiProperty({ example: '12345678901' })
  @IsNotEmpty({message: 'Campo obrigatório'})
  cpfCnpj!: string;

  @ApiProperty({ example: 'João da Silva' })
  @IsNotEmpty({message: 'Campo obrigatório'})
  name!: string;
}
