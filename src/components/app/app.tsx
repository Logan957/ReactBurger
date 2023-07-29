import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {
  return (
    <div className="">
      <AppHeader />
      <div className="d-flex">
        <div>
          <BurgerIngredients />
        </div>
        <div className="ml-10">
          <BurgerConstructor />
        </div>
      </div>
    </div>
  );
}

export default App;
