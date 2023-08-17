import { memo, useEffect, useState } from "react";
import { TIngredient } from "../../services/types/ingredient-types";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/reducers/thunks/ingredient-thunk";

function App() {
  const [ingredients, setIngridients] = useState<Array<TIngredient>>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);
  return (
    <>
      <AppHeader />
      <main className="d-flex justify-content-center">
        {isError ? (
          <p>Ошибка при получении данных</p>
        ) : (
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </>
        )}
      </main>
    </>
  );
}

export default memo(App);
