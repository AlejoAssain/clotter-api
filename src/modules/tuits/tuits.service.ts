import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Tuit } from './tuit.entity';
import { CreateTuitDto, UpdateTuitDto} from "./dto/index";
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm/dist';


@Injectable()
export class TuitsService {

  constructor(
    @InjectRepository(Tuit)
    private readonly tuitRepository: Repository<Tuit>
  ) {}


  async getTuits() : Promise<Tuit[]> {
    return await this.tuitRepository.find();
  }

  async getTuit(id: number) : Promise<Tuit> {
    const tuit : Tuit = await this.tuitRepository.findOneBy({id: id});

    if (!tuit) {
      throw new NotFoundException("Resource not found");
    }

    return tuit;

  }

  async createTuit({ message }: CreateTuitDto) {
    const tuit : Tuit = this.tuitRepository.create({
      message: message
    });

    return this.tuitRepository.save(tuit);
  }

  async updateTuit(id: number, { message: newMessage }: UpdateTuitDto) {
    const tuit: Tuit = await this.tuitRepository.preload({
      id: id
    })

    if (!tuit) {
      throw new NotFoundException("Resource not found");
    }

    tuit.message = newMessage;

    this.tuitRepository.save(tuit);

    return tuit;

  }

  async removeTuit(id: number) : Promise<void> {
    const tuit : Tuit = await this.tuitRepository.findOneBy({id: id});

    if (!tuit) {
      throw new NotFoundException("Resource not found");
    }

    this.tuitRepository.remove(tuit);

  }

}
