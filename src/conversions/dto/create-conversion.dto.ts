import { IsNumber, IsPositive, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConversionDto {
  @ApiProperty({
    example: 100,
    description: 'Valor a ser convertido (deve ser positivo)',
  })
  @IsNumber({}, { message: 'amount deve ser um número' })
  @IsPositive({ message: 'amount deve ser maior que zero' })
  amount!: number;

  @ApiProperty({
    example: 'BRL',
    enum: ['BRL', 'USD', 'EUR'],
    description: 'Moeda de origem',
  })
  @IsIn(['BRL', 'USD', 'EUR'], {
    message: 'fromCurrency deve ser BRL, USD ou EUR',
  })
  fromCurrency!: string;
}
