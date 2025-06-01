import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class CreateCropDto {
  @ApiProperty({ example: 'Milho' })
  @IsString()
  @IsNotEmpty({message: 'Campo obrigatório'})
  name!: string;

  @ApiProperty({ example: uuidv4() })
  @IsUUID()
  @IsNotEmpty({message: 'Campo obrigatório'})
  harvestId!: string;
}
