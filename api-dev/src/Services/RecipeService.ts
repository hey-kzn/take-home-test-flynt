import { getRepository, In } from "typeorm";
import { Ingredient } from "../Entities/Ingredient";
import { Recipe } from "../Entities/Recipe";
import {CreateRecipeDTO} from "../dto/create-recipe.dto";

import {IngredientTag} from "../Entities/Ingredient";

export class RecipeService {

  static async list(): Promise<Recipe[]> {
    const recipes = await getRepository(Recipe).find({
      relations: ["ingredients"],
    });
    return recipes;
  }

  static async create(recipe: CreateRecipeDTO): Promise<Recipe> {

    const ingredients = await getRepository(Ingredient).find({
      where: { id: In(recipe.ingredientIds) },
    });

    await this.validateRecipe(ingredients);

    const newRecipe = await getRepository(Recipe).save(recipe);
    return newRecipe;
  }

  static async update(recipe: Recipe): Promise<Recipe> {
    const updatedRecipe = await getRepository(Recipe).save(recipe);
    return updatedRecipe;
  }

  static async delete(id: number): Promise<void> {
    await getRepository(Recipe).delete(id);
  }

  private static async validateRecipe(ingredients: Ingredient[]): Promise<void> {

    const proteins = ingredients.filter(i => i.tag === IngredientTag.PROTEINE);
    const feculents = ingredients.filter(i => i.tag === IngredientTag.FECULENT);

    if (proteins.length > 1) throw new Error('Une recette ne peut contenir qu’une seule protéine');
    if (feculents.length > 1 || feculents.length < 1) throw new Error('Une recette ne peut contenir qu’un féculent');


    for (const protein of proteins) {
      const usedIn = await getRepository(Recipe)
          .createQueryBuilder('recipe')
          .leftJoinAndSelect('recipe.ingredients', 'ingredient')
          .where('ingredient.id = :id', { id: protein.id })
          .getOne();

      if (usedIn) throw new Error(`La protéine "${protein.name}" est déjà utilisée dans la recette "${usedIn.name}"`);
    }

  }
}
