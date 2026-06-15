import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

import { ConversionsService } from "./conversions.service";
import { CreateConversionDto } from "./dto/create-conversion.dto";
import { UpdateConversionDto } from "./dto/update-conversion.dto";

@ApiTags("Conversões de Moedas")
@Controller("conversions")
export class ConversionsController {
  constructor(private readonly conversionsService: ConversionsService) {}

  @Post()
  @ApiOperation({
    summary: "Realizar nova conversão de moeda",
    description:
      "Cria uma nova conversão utilizando as cotações atuais e salva o resultado no banco de dados.",
  })
  create(@Body() createConversionDto: CreateConversionDto) {
    return this.conversionsService.create(createConversionDto);
  }

  @Get()
  @ApiOperation({
    summary: "Histórico de conversões realizadas",
    description:
      "Lista todas as conversões já salvas no banco de dados MongoDB.",
  })
  findAll() {
    return this.conversionsService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Pesquisar conversão por ID",
    description:
      "Busca uma conversão específica utilizando o ID salvo no banco.",
  })
  @ApiParam({
    name: "id",
    description: "ID da conversão salva no MongoDB",
    example: "684d0d2f4e2b6e1f5b8a1234",
  })
  findOne(@Param("id") id: string) {
    return this.conversionsService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Atualizar conversão existente",
    description: "Atualiza os dados de uma conversão já cadastrada.",
  })
  @ApiParam({
    name: "id",
    description: "ID da conversão salva no MongoDB",
    example: "684d0d2f4e2b6e1f5b8a1234",
  })
  update(
    @Param("id") id: string,
    @Body() updateConversionDto: UpdateConversionDto,
  ) {
    return this.conversionsService.update(id, updateConversionDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Excluir conversão do histórico",
    description:
      "Remove uma conversão salva no banco de dados utilizando o ID.",
  })
  @ApiParam({
    name: "id",
    description:
      'ID da conversão salva no MongoDB. Copie o ID através da rota "Histórico de conversões realizadas".',
    example: "684d0d2f4e2b6e1f5b8a1234",
  })
  remove(@Param("id") id: string) {
    return this.conversionsService.remove(id);
  }
}
