import AppHeader from "./components/app-header";
import BurgerConstructor from "./components/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients";

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
