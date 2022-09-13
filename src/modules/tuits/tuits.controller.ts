import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Query
} from '@nestjs/common';

import { Tuit } from './entities/tuit.entity';
import { TuitsService } from './tuits.service';
import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto} from "./dto/index"


@Controller('tuits')
export class TuitsController {
  constructor(private readonly tuitsService: TuitsService) {}

  @Get("/")
  getTuits(@Query() pagination: PaginationQueryDto) : Promise<Tuit[]> {
    return this.tuitsService.getTuits(pagination);
  }

  @Get("/:id")
  getTuit(@Param("id") idParam : number) : Promise<Tuit> {
    return this.tuitsService.getTuit(idParam);
  }

  @Post()
  createTuit(@Body() body : CreateTuitDto) : Promise<Tuit> {
    return this.tuitsService.createTuit(body);
  }

  @Patch("/:id")
  updateTuit(@Param("id") id : number, @Body() body : UpdateTuitDto) : Promise<Tuit> {
    return this.tuitsService.updateTuit(id, body);
  }

  @Delete("/:id")
  removeTuit(@Param("id") id : number) : Promise<void> {
    return this.tuitsService.removeTuit(id);
  }
}
