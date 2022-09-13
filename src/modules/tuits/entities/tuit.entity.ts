import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities";


@Entity()
export class Tuit {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  message: string;

  @ManyToOne(type => User, user => user.tuits, { cascade: true })
  @JoinColumn({ name: "user_id" })
  user: User

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
