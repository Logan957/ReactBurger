import { mockIngredients } from '../../mocks/ingredients';
import { ingredientReducer, getIngridientsLoading, getIngredients, getIngredientsError, setCurrentIngredient, initialState } from '../slices/ingredient-slice';

describe('ingredientReducer', () => {
  it('should handle getIngridientsLoading', () => {
    const nextState = ingredientReducer(initialState, getIngridientsLoading());
    expect(nextState.isIngridientsLoading).toBe(true);
    expect(nextState.ingredientsError).toBe("");
  });

  it('should handle getIngredients', () => {
    const nextState = ingredientReducer(initialState, getIngredients(mockIngredients));
    expect(nextState.isIngridientsLoading).toBe(false);
    expect(nextState.ingredients).toEqual(mockIngredients);
  });

  it('should handle getIngredientsError', () => {
    const error = "Failed to fetch ingredients";
    const nextState = ingredientReducer(initialState, getIngredientsError(error));
    expect(nextState.isIngridientsLoading).toBe(false);
    expect(nextState.ingredientsError).toBe(error);
  });

  it('should handle setCurrentIngredient', () => {
    const ingredient = mockIngredients[0]
    const nextState = ingredientReducer(initialState, setCurrentIngredient(ingredient));
    expect(nextState.currentIngridient).toEqual(ingredient);
  });
});