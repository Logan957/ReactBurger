import { memo, useEffect } from "react";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { getIngredients } from "../../services/reducers/thunks/ingredient-thunk";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {
  const dispatch = useAppDispatch();

  const { ingredientsError } = useTypedSelector((state) => state.ingredient);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);
  return (
    <>
      <AppHeader />
      <main className="d-flex justify-content-center">
        {ingredientsError != "" ? (
          <p>Ошибка при получении данных</p>
        ) : (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        )}
      </main>
    </>
  );
}

export default memo(App);
