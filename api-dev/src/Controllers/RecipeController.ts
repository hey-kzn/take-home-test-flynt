import { RecipeService } from "../Services/RecipeService";
import {Request, Response} from "express";
import {CreateRecipeDTO} from "../dto/create-recipe.dto";

export class RecipeController {
  public static async list(req: any, res: any, next: any): Promise<void> {
    try {
      const recipes = await RecipeService.list();
      res.send(recipes);
    } catch (err) {
      console.error("[RecipeController.list] Error listing recipes", err);
      res.send(500);
    }
  }

  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateRecipeDTO = req.body;
      const result = await RecipeService.create(data);

      res.status(201).json(result);
    } catch (err) {
      console.error("[RecipeController.create] Error creating recipe", err);
      res.send(500);
    }
  }

  public static async update(req: any, res: any, next: any): Promise<void> {
    try {
      const recipe = await RecipeService.update(req.body);
      res.send(recipe);
    } catch (err) {
      console.error("[RecipeController.update] Error updating recipe", err);
      res.send(500);
    }
  }

  public static async delete(req: any, res: any, next: any): Promise<void> {
    try {
      await RecipeService.delete(req.params.id);
      res.send();
    } catch (err) {
      console.error("[RecipeController.delete] Error deleting recipe", err);
      res.send(500);
    }
  }
}
