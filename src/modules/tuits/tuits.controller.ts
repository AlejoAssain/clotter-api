import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException
} from '@nestjs/common';

import { Tuit } from './tuit.entity';
import { TuitsService } from './tuits.service';
import { CreateTuitDto, UpdateTuitDto} from "./dto/index"


@Controller('tuits')
export class TuitsController {
  constructor(private readonly tuitsService: TuitsService) {}

  @Get("/")
  getTuits() : Tuit[] {
    return this.tuitsService.getTuits();
  }

  @Get("/:id")
  getTuit(@Param("id") idParam : number) : Tuit {
    const tuit = this.tuitsService.getTuit(idParam);

    if (!tuit) {
      throw new NotFoundException("Resource not found");
    }

    return tuit;
  }

  @Post()
  createTuit(@Body() body : CreateTuitDto) : string {
    return this.tuitsService.createTuit(body);
  }

  @Patch("/:id")
  updateTuit(@Param("id") id : number, @Body() body : UpdateTuitDto) : string {
    return this.tuitsService.updateTuit(id, body);
  }

  @Delete("/:id")
  removeTuit(@Param("id") id : number) : string {
    return this.tuitsService.removeTuit(id);
  }
}
