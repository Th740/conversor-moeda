import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';

import { CreateConversionDto } from './dto/create-conversion.dto';
import { UpdateConversionDto } from './dto/update-conversion.dto';
import { Conversion, ConversionDocument } from './entities/conversion.schema';

interface ExchangeRateResponse {
  rates: {
    BRL: number;
    USD: number;
    EUR: number;
  };
}

interface ConversionResult {
  brl: number;
  usd: number;
  eur: number;
}

@Injectable()
export class ConversionsService {
  constructor(
    @InjectModel(Conversion.name)
    private readonly conversionModel: Model<ConversionDocument>,
  ) {}

  private async calcularConversao(
    amount: number,
    fromCurrency: string,
  ): Promise<ConversionResult> {
    try {
      const response = await axios.get<ExchangeRateResponse>(
        `https://open.er-api.com/v6/latest/${fromCurrency}`,
      );

      const { BRL, USD, EUR } = response.data.rates;

      if (!BRL || !USD || !EUR) {
        throw new BadRequestException(`Moeda ${fromCurrency} não suportada`);
      }

      return {
        brl: Number((amount * BRL).toFixed(2)),
        usd: Number((amount * USD).toFixed(2)),
        eur: Number((amount * EUR).toFixed(2)),
      };
    } catch {
      throw new BadRequestException('Erro ao consultar taxas de câmbio');
    }
  }

  async create(createConversionDto: CreateConversionDto) {
    const { amount, fromCurrency } = createConversionDto;

    const { brl, usd, eur } = await this.calcularConversao(
      amount,
      fromCurrency,
    );

    return this.conversionModel.create({
      amount,
      fromCurrency,
      brl,
      usd,
      eur,
    });
  }

  async findAll() {
    return this.conversionModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    const conversion = await this.conversionModel.findById(id).exec();

    if (!conversion) {
      throw new NotFoundException(`Conversão com id ${id} não encontrada`);
    }

    return conversion;
  }

  async update(id: string, updateConversionDto: UpdateConversionDto) {
    const current = await this.findOne(id);

    const amount = updateConversionDto.amount ?? current.amount;
    const fromCurrency =
      updateConversionDto.fromCurrency ?? current.fromCurrency;

    const { brl, usd, eur } = await this.calcularConversao(
      amount,
      fromCurrency,
    );

    const updated = await this.conversionModel
      .findByIdAndUpdate(
        id,
        {
          amount,
          fromCurrency,
          brl,
          usd,
          eur,
        },
        {
          new: true,
        },
      )
      .exec();

    if (!updated) {
      throw new NotFoundException(`Conversão com id ${id} não encontrada`);
    }

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.conversionModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException(`Conversão com id ${id} não encontrada`);
    }

    return {
      message: 'Conversão removida com sucesso!',
    };
  }
}
