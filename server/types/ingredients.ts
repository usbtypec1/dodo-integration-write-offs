export interface Ingredient {
  id: string;
  name: string;
}

export interface IngredientsResponse {
  ingredients: Ingredient[];
}
