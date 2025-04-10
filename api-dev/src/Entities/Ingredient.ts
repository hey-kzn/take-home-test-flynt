import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import {Recipe} from "./Recipe";

export enum IngredientTag {
  LEGUME = "légumes",
  PROTEINE = "protéine",
  FECULENT = "féculent",
}


@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column({
    type: "enum",
    enum: IngredientTag,
  })
  tag: IngredientTag;

  @ManyToMany(() => Recipe, (recipe) => recipe.ingredients)
  recipes: Recipe[];
}
