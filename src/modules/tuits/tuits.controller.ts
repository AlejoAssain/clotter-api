import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';

import { Tuit } from './tuit.entity';
import { TuitsService } from './tuits.service';
import { CreateTuitDto, UpdateTuitDto} from "./dto/index"


@Controller('tuits')
export class TuitsController {
  constructor(private readonly tuitsService: TuitsService) {}

  @Get("/")
  getTuits() : Promise<Tuit[]> {
    return this.tuitsService.getTuits();
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
