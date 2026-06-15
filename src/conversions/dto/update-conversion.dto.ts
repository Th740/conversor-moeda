import { IsNumber, IsPositive, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateConversionDto {
  @ApiProperty({
    example: 200,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'amount deve ser um número' })
  @IsPositive({ message: 'amount deve ser maior que zero' })
  amount?: number;

  @ApiProperty({
    example: 'USD',
    enum: ['BRL', 'USD', 'EUR'],
    required: false,
  })
  @IsOptional()
  @IsIn(['BRL', 'USD', 'EUR'], {
    message: 'fromCurrency deve ser BRL, USD ou EUR',
  })
  fromCurrency?: string;
}
