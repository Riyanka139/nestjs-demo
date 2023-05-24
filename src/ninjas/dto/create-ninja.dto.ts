import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric } from 'class-validator';

export class CreateNinjaDto {
  @ApiProperty()
  @IsAlphanumeric()
  name: string;

  @ApiProperty()
  weapon: 'star' | 'nunchuck';
}
