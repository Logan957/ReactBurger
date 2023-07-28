import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/AppHeader";
import BurgerConstructor from "./components/BurgerConstructor";
import BurgerIngredients from "./components/BurgerIngredients";

function App() {
  return (
    <div className="">
      <AppHeader />
      <BurgerConstructor />
      <BurgerIngredients />
    </div>
  );
}

export default App;
