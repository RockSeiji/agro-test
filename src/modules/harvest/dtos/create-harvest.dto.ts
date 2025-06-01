import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class CreateHarvestDto {
  @ApiProperty({ example: 2025 })
  @IsNumber({}, { message: 'Valor inválido.' })
  @IsNotEmpty({message: 'Campo obrigatório'})
  year!: number;

  @ApiProperty({ example: uuidv4() })
  @IsUUID()
  @IsNotEmpty({message: 'Campo obrigatório'})
  propertyId!: string;
}
