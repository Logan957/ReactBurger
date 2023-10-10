import { API_URL_ORDERS } from "../../constants/constant";
import { TIngredient } from "../../types/ingredient-type";
import { TCreatedOrder, TNewOrder, TOrder } from "../../types/order-type";
import { TAppDispatch, TAppThunk } from "../../types/reducer-type";
import { fetchWithRefresh } from "../../utils";
import { addNewIngridient, removeIngridient, createOrderError, createOrderLoading, createdOrder, setCurrentBun,setTotalPrice, setIngredients, resetNewOrder, getOrderLoading, getedOrder, getOrderError } from "../slices/order-slice";


interface OrderResponse {
  success: boolean;
  order: TCreatedOrder;
  name: string;
}

interface GetOrderResponse {
  success: boolean;
  orders: Array<TOrder>;
}


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
    const response = await fetchWithRefresh<OrderResponse>(`${API_URL_ORDERS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken")!,
      },
      body: JSON.stringify({
        ingredients: ids
      })
    });
    dispatch(resetNewOrder());
    dispatch(createdOrder(response.order.number));
  } catch (error) {
    dispatch(createOrderError("Ошибка"));
  }
}
export const getOrderThunk =
  (number : string): TAppThunk => async (dispatch: TAppDispatch) => {
 
  try {
    dispatch(getOrderLoading());
    const response = await fetchWithRefresh<GetOrderResponse>(`${API_URL_ORDERS}/${number}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken")!,
      },
    });
    dispatch(getedOrder(response.orders[0]));
  } catch (error) {
    dispatch(getOrderError("Ошибка"));
  }
}

  export const setTotalPriceThunk =
  (totalPrice: number): TAppThunk => async (dispatch: TAppDispatch) => {

      dispatch(setTotalPrice(totalPrice))
  };

