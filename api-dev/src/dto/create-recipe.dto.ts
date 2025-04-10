export interface CreateRecipeDTO {
    name: string;
    timeToCook: number;
    numberOfPeople: number;
    ingredientIds: number[];
}