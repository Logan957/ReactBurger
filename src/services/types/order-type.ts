import { TIngredient } from "./ingredient-type";

export interface TNewOrder {
    currentBun : TIngredient | null
    ingredients : Array<TIngredient>
    totalPrice : number
  }
  