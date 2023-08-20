import { API_URL_ORDERS } from "../../constants/constant";
import { TIngredient } from "../../types/ingredient-type";
import { TNewOrder } from "../../types/order-type";
import { TAppDispatch, TAppThunk } from "../../types/reducer-type";
import { addNewIngridient, removeIngridient, createOrderError, createOrderLoading, createdOrder, setCurrentBun,setTotalPrice, setIngredients } from "../slices/order-slice";

export const addIngredient =
  (ingredient: TIngredient): TAppThunk => async (dispatch: TAppDispatch) => {

    if(ingredient.type === "bun")
    {    
      dispatch(setCurrentBun(ingredient))
    }
    else{
      dispatch(addNewIngridient(ingredient))
    }
  };

  export const removeIngredientThunk =
  (index: number): TAppThunk => async (dispatch: TAppDispatch) => {

      dispatch(removeIngridient(index))
  };

  export const clearCreatedOrderThunk =
  (): TAppThunk => async (dispatch: TAppDispatch) => {
      dispatch(createdOrder(null))
  };

  export const updateIngredientsThunk =
  (ingredients: Array<TIngredient>): TAppThunk => async (dispatch: TAppDispatch) => {

      dispatch(setIngredients(ingredients))
  };

  export const createNewOrderThunk =
  (newOrder : TNewOrder): TAppThunk => async (dispatch: TAppDispatch) => {

    
  let ids = newOrder.currentBun ? [newOrder.currentBun._id, newOrder.currentBun._id] : [];

  ids.push(...newOrder.ingredients.map(ingredient => ingredient._id));  
    

  
  try {
    dispatch(createOrderLoading());
    const response = await fetch(`${API_URL_ORDERS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ids
      })
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(createdOrder(data.order.number));
    } else {
      console.log("error 0");
      const errorText = await response.text();
      throw new Error(`Ошибка ${response.status}: ${errorText}`);
    }
  } catch (error) {
    console.log("error 1");
    dispatch(createOrderError("Ошибка"));
  }
}

  export const setTotalPriceThunk =
  (totalPrice: number): TAppThunk => async (dispatch: TAppDispatch) => {

      dispatch(setTotalPrice(totalPrice))
  };

