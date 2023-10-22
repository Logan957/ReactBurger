import { mockIngredients } from '../../mocks/ingredients';
import { orderReducer, createOrderLoading, createdOrder, createOrderError, removeIngridient, setCurrentBun, setTotalPrice, setIngredients, resetNewOrder, getOrderError, getOrderLoading, getedOrder } from '../slices/order-slice';

describe('orderReducer', () => {
  const initialState = {
    isCreateLoading: false,
    createdOrder: null,
    createError: "",
    isGetLoading: false,
    getedOrder: null,
    getError: "",
    newOrder: {
      currentBun : null, 
      ingredients : [],
      totalPrice : 0,
    },
  };

  it('should handle createOrderLoading', () => {
    const nextState = orderReducer(initialState, createOrderLoading());
    expect(nextState.isCreateLoading).toBe(true);
    expect(nextState.createError).toBe("");
  });

  it('should handle createdOrder', () => {
    const orderId = 123;
    const nextState = orderReducer(initialState, createdOrder(orderId));
    expect(nextState.isCreateLoading).toBe(false);
    expect(nextState.createdOrder).toBe(orderId);
  });

  it('should handle createOrderError', () => {
    const error = "Failed to create order";
    const nextState = orderReducer(initialState, createOrderError(error));
    expect(nextState.isCreateLoading).toBe(false);
    expect(nextState.createError).toBe(error);
  });

  it('should handle removeIngridient', () => {
    const stateWithIngredients = { ...initialState, newOrder: { ...initialState.newOrder, mockIngredients } };
    const indexToRemove = 1;
    const nextState = orderReducer(stateWithIngredients, removeIngridient(indexToRemove));
    expect(nextState.newOrder.ingredients).not.toContainEqual(expect.objectContaining(mockIngredients[indexToRemove]));
  });

  it('should handle setCurrentBun', () => {
    const bun = mockIngredients[0]
    const nextState = orderReducer(initialState, setCurrentBun(bun));
    expect(nextState.newOrder.currentBun).toEqual(bun);
  });

  it('should handle setTotalPrice', () => {
    const totalPrice = 20;
    const nextState = orderReducer(initialState, setTotalPrice(totalPrice));
    expect(nextState.newOrder.totalPrice).toEqual(totalPrice);
  });

  it('should handle setIngredients', () => {
    const nextState = orderReducer(initialState, setIngredients(mockIngredients));
    expect(nextState.newOrder.ingredients).toEqual(mockIngredients);
  });

  it('should handle resetNewOrder', () => {
    const stateWithIngredients = { ...initialState, newOrder: { ...initialState.newOrder, mockIngredients } };
    const nextState = orderReducer(stateWithIngredients, resetNewOrder());
    expect(nextState.newOrder).toEqual(initialState.newOrder);
  });

  it('should handle getOrderError', () => {
    const error = "Failed to get order";
    const nextState = orderReducer(initialState, getOrderError(error));
    expect(nextState.isGetLoading).toBe(false);
    expect(nextState.getError).toBe(error);
  });

  it('should handle getOrderLoading', () => {
    const nextState = orderReducer(initialState, getOrderLoading());
    expect(nextState.isGetLoading).toBe(true);
    expect(nextState.getError).toBe("");
  });

  it('should handle getedOrder', () => {
    const order = {
      createdAt: new Date(),
      ingredients: [],
      name: "space-burger",
      number: 12345,
      status: "done",
      updateAt: new Date(),
      _id: "5df543e4r89e875f46sd45f564rewsd87894"
    };

    const nextState = orderReducer(initialState, getedOrder(order));
    expect(nextState.isGetLoading).toBe(false);
    expect(nextState.getedOrder).toEqual(order);
  });
});