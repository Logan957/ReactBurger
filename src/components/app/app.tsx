import { memo, useEffect } from "react";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { getIngredientsThunk } from "../../services/reducers/thunks/ingredient-thunk";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useAppDispatch();

  const { ingredientsError } = useTypedSelector((state) => state.ingredient);

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, [dispatch]);
  return (
    <>
      <AppHeader />
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
}

export default memo(App);
