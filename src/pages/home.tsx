import React, { memo, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useAppDispatch } from "../hooks/use-app-dispatch";
import { getIngredientsThunk } from "../services/reducers/thunks/ingredient-thunk";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { ingredientsError } = useTypedSelector((state) => state.ingredient);

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  return (
    <>
      <main className="d-flex justify-content-center">
        {ingredientsError !== "" ? (
          <p>Ошибка при получении данных</p>
        ) : (
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </>
        )}
      </main>
    </>
  );
};

export default memo(HomePage);
