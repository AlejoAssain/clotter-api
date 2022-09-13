import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm/dist';

import { Tuit } from './entities/tuit.entity';
import { User } from '../users/entities';
import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto} from "./dto/index";



@Injectable()
export class TuitsService {

  constructor(
    @InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>,

    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}


  async getTuits(param: PaginationQueryDto) : Promise<Tuit[]> {
    const { limit, offset } = param;
    return await this.tuitRepository.find({ relations: ["user"], skip: offset, take: limit });
  }

  async getTuit(id: number) : Promise<Tuit> {
    const tuit : Tuit = await this.tuitRepository.findOneBy({id: id});

    if (!tuit) {
      throw new NotFoundException("Resource not found");
    }

    return tuit;

  }

  async createTuit(body: CreateTuitDto) {
    const { message, user } = body;
    const tuit : Tuit = this.tuitRepository.create({
      message: message,
      user: user
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
