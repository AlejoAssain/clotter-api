import { Injectable } from '@nestjs/common';

import { Tuit } from './tuit.entity';
import { CreateTuitDto, UpdateTuitDto} from "./dto/index"


@Injectable()
export class TuitsService {
  private tuits : Tuit[] = [
    {
      id: 1,
      message: "Hello, first tuit"
    }
  ];

  getTuits() : Tuit[] {
    return this.tuits;
  }

  getTuit(id: number) : Tuit {
    return this.tuits.find(tuit => tuit.id === id);
  }

  createTuit({ message }: CreateTuitDto) : string {
    this.tuits.push({
      id: (Math.floor(Math.random() * 2000) + 1),
      message: message
    })

    return `Tuit added`;
  }

  updateTuit(id: number, { message: newMessage }: UpdateTuitDto) : string {
    const index = this.tuits.findIndex(tuit => tuit.id === id);

    if (index > -1) {
      this.tuits[index].message = newMessage;
      return "Tuit updated";

    } else {
      return "Tuit doesn't exists";

    }
  }

  removeTuit(id: number) : string {
    const index = this.tuits.findIndex(tuit => tuit.id === id);

    if (index > -1) {
      this.tuits.splice(index, 1);
      return "Tuit deleted";

    } else {
      return "Tuit doesn't exists";

    }
  }

}
