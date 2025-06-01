import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsNumber, Min } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class CreatePropertyDto {
  @ApiProperty({ example: uuidv4() })
  @IsUUID()
  @IsNotEmpty({message: 'Campo obrigatório'})
  producerId!: string;

  @ApiProperty({ example: 'Fazenda Feliz' })
  @IsString()
  @IsNotEmpty({message: 'Campo obrigatório'})
  name!: string;

  @ApiProperty({ example: 'Brasília' })
  @IsString()
  @IsNotEmpty({message: 'Campo obrigatório'})
  city!: string;

  @ApiProperty({ example: 'DF' })
  @IsString()
  @IsNotEmpty({message: 'Campo obrigatório'})
  state!: string;

  @ApiProperty({ example: 100 })
  @IsNumber({}, { message: 'Valor inválido.' })
  @Min(0)
  totalArea!: number;

  @ApiProperty({ example: 80 })
  @IsNumber({}, { message: 'Valor inválido.' })
  @Min(0)
  arableArea!: number;

  @ApiProperty({ example: 20 })
  @IsNumber({}, { message: 'Valor inválido.' })
  @Min(0)
  vegetationArea!: number;
}
