import { API_URL } from "../../utils/config";
import { TIngredient } from "../../utils/types";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useState, useEffect, memo } from "react";

function App() {
  const [ingridients, setIngridients] = useState<Array<TIngredient>>([]);

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((response) => response.json())
      .then((response) => setIngridients(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <AppHeader />
      <main className="d-flex justify-content-center">
        <BurgerIngredients ingredients={ingridients} />
        <div className="ml-10">
          <BurgerConstructor ingredients={ingridients} />
        </div>
      </main>
    </>
  );
}

export default memo(App);
