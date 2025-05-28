export interface IngredientWriteOff {
  id: string;
  ingredientName: string;
  toWriteOffAt: string;
  writtenOffAt: string | null;
  createdAt: string;
}

export interface IngredientWriteOffCreateEvent {
  ingredientId: string;
  toWriteOffAt: string;
}
