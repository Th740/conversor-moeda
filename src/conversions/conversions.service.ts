import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConversionDto } from './dto/create-conversion.dto';

@Injectable()
export class ConversionsService {

 private conversions: any[] = [];
  private id = 1;

  create(createConversionDto: CreateConversionDto) {

    const { amount, fromCurrency } = createConversionDto;

    if (amount <= 0) {
      throw new Error('O valor deve ser maior que zero');
    }

    const usdRate = 0.18;
    const eurRate = 0.16;

    const newConversion = {
      id: this.id++,
      amount,
      fromCurrency,
      usd: amount * usdRate,
      eur: amount * eurRate,
    };

    this.conversions.push(newConversion);

    return newConversion;
  }

  findAll() {
    return this.conversions;
  }

  findOne(id: number) {

    const conversion = this.conversions.find(
      item => item.id === id,
    );

    if (!conversion) {
      throw new NotFoundException('Conversão não encontrada');
    }

    return conversion;
  }

  update(id: number, body: any) {

    const conversion = this.findOne(id);

    if (body.amount) {

      const usdRate = 0.18;
      const eurRate = 0.16;

      conversion.amount = body.amount;
      conversion.usd = body.amount * usdRate;
      conversion.eur = body.amount * eurRate;
    }

    return conversion;
  }

  remove(id: number) {

    const index = this.conversions.findIndex(
      item => item.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Conversão não encontrada');
    }

    this.conversions.splice(index, 1);

    return {
      message: 'Conversão removida',
    };
  }
}