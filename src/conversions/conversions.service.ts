import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateConversionDto } from './dto/create-conversion.dto';
import {
  Conversion,
  ConversionDocument,
} from './entities/conversion.entity';

@Injectable()
export class ConversionsService {
  constructor(
    @InjectModel(Conversion.name)
    private conversionModel: Model<ConversionDocument>,
  ) {}

  async create(createConversionDto: CreateConversionDto) {
    const { amount, fromCurrency } = createConversionDto;

    if (amount <= 0) {
      throw new BadRequestException('O valor deve ser maior que zero');
    }

    const usdRate = 0.18;
    const eurRate = 0.16;

    const newConversion = new this.conversionModel({
      amount,
      fromCurrency,
      usd: amount * usdRate,
      eur: amount * eurRate,
    });

    return newConversion.save();
  }

  async findAll() {
    return this.conversionModel.find().exec();
  }

  async findOne(id: string) {
    const conversion = await this.conversionModel.findById(id).exec();

    if (!conversion) {
      throw new NotFoundException('Conversão não encontrada');
    }

    return conversion;
  }

  async update(id: string, body: any) {
    const usdRate = 0.18;
    const eurRate = 0.16;

    if (body.amount) {
      body.usd = body.amount * usdRate;
      body.eur = body.amount * eurRate;
    }

    const conversion = await this.conversionModel
      .findByIdAndUpdate(id, body, { new: true })
      .exec();

    if (!conversion) {
      throw new NotFoundException('Conversão não encontrada');
    }

    return conversion;
  }

  async remove(id: string) {
    const conversion = await this.conversionModel.findByIdAndDelete(id).exec();

    if (!conversion) {
      throw new NotFoundException('Conversão não encontrada');
    }

    return {
      message: 'Conversão removida',
    };
  }
}