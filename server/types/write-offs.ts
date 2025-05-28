export interface IngredientWriteOff {
  id: string;
  ingredient_name: string;
  to_write_off_at: string;
  written_off_at: string | null;
  created_at: string;
}

export interface IngredientWriteOffsResponse {
  ingredient_write_offs: IngredientWriteOff[];
}
