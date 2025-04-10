import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ingredient } from "./Ingredient";

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  timeToCook: number;

  @Column()
  numberOfPeople: number;

  @ManyToMany(() => Ingredient, ingredient => ingredient.recipes)
  @JoinTable()
  ingredients: Ingredient[];
}
