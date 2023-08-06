import { API_URL } from "../../utils/config";
import { TIngredient } from "../../utils/types";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useState, useEffect, memo } from "react";

function App() {
  const [ingridients, setIngridients] = useState<Array<TIngredient>>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        setIngridients(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    }

    if (!isLoading) {
      fetchData();
    }
  }, []);

  return (
    <>
      <AppHeader />
      <main className="d-flex justify-content-center">
        {isError ? (
          <p>Ошибка при получении данных</p>
        ) : (
          <>
            <BurgerIngredients ingredients={ingridients} />
            <div className="ml-10">
              <BurgerConstructor ingredients={ingridients} />
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default memo(App);
