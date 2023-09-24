import { TIngredient } from "./ingredient-type";

export type TNewOrder = {
    currentBun : TIngredient | null
    ingredients : Array<TIngredient>
    totalPrice : number
  }

  export type TCreatedOrder = {
    createdAt : Date
    ingredients : Array<TIngredient>
    name : string
    number: number
    price : number
    status : string
    updateAt : Date
    _id: string
  }
  