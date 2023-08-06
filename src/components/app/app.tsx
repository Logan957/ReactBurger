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
        response.json().then((data) => {
          if (response.ok) {
            setIngridients(data.data);
          } else {
            return Promise.reject(`Ошибка ${response.status}`);
          }
        });
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (!isLoading) {
      setIsLoading(true);
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
            <BurgerConstructor ingredients={ingridients} />
          </>
        )}
      </main>
    </>
  );
}

export default memo(App);
