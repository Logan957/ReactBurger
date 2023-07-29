import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/app-header";
import BurgerConstructor from "./components/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients";

function App() {
  return (
    <div className="">
      <AppHeader />
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  );
}

export default App;
