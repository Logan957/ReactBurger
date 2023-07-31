import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {
  return (
    <>
      <AppHeader />
      <main className="d-flex justify-content-center">
        <BurgerIngredients />
        <div className="ml-10">
          <BurgerConstructor />
        </div>
      </main>
    </>
  );
}

export default App;
