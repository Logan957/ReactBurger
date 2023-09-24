import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { memo, useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useModal } from "../../hooks/use-modal";
import { TIngredient } from "../../services/types/ingredient-type";
import DragIngredientCard from "../dnd/drag-ingredient-card/drag-ingredient-card";
import styles from "./burger-ingredients.module.css";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { setCurrentIngredient } from "../../services/reducers/slices/ingredient-slice";

const BurgerIngredients: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useState("burgers");
  const { openModal } = useModal();
  const { ingredients } = useTypedSelector((state) => state.ingredient);

  const { newOrder } = useTypedSelector((state) => state.order);

  const handleOpenModal = (ingredient: TIngredient) => () => {
    dispatch(setCurrentIngredient(ingredient));
    openModal();
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollRef.current;

    const handleScroll = () => {
      if (container && scrollContainer) {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
          const containerRect = container.getBoundingClientRect();
          const headings = container.querySelectorAll("h2");
          let closestHeading: any = null;
          let closestDistance = Infinity;

          headings.forEach((heading) => {
            const headingRect = heading.getBoundingClientRect();
            const distance = Math.sqrt(
              Math.pow(headingRect.left - containerRect.left, 2) +
                Math.pow(headingRect.top - containerRect.top, 2)
            );
            if (distance < closestDistance) {
              closestHeading = heading;
              closestDistance = distance;
            }
          });

          if (closestHeading) {
            setCurrentTab(closestHeading.dataset.category || "buns");
          }
        }, 100);
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className={`${styles.card}`} ref={containerRef}>
      <h1 className="text text_type_main-medium mt-8">Соберите бургер</h1>
      <div className="d-flex mt-2">
        <Tab
          value="burgers"
          active={currentTab === "burgers"}
          onClick={setCurrentTab}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={currentTab === "sauces"}
          onClick={setCurrentTab}
        >
          Соусы
        </Tab>
        <Tab
          value="toppings"
          active={currentTab === "toppings"}
          onClick={setCurrentTab}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients_container}`} ref={scrollRef}>
        <>
          <h2
            data-category="burgers"
            className="mt-10 text text_type_main-medium"
          >
            Булки
          </h2>
          <div className={`d-flex flex-wrap mt-6`}>
            {ingredients
              .filter((x) => x.type === "bun")
              .map((x) => {
                return (
                  <div key={x._id} onClick={handleOpenModal(x)}>
                    <DragIngredientCard
                      count={newOrder.currentBun?._id === x._id ? 1 : 0}
                      ingredient={x}
                    />
                  </div>
                );
              })}
          </div>
        </>
        <>
          <h2
            data-category="sauces"
            className="mt-10 text text_type_main-medium"
          >
            Соусы
          </h2>
          <div className="d-flex flex-wrap mt-6">
            {ingredients
              .filter((x) => x.type === "sauce")
              .map((x) => {
                return (
                  <div key={x._id} onClick={handleOpenModal(x)}>
                    <DragIngredientCard
                      count={newOrder.ingredients.reduce((acc, y) => {
                        if (y._id === x._id) {
                          acc++;
                        }
                        return acc;
                      }, 0)}
                      ingredient={x}
                    />
                  </div>
                );
              })}
          </div>
        </>
        <>
          <h2
            data-category="toppings"
            className="mt-10 text text_type_main-medium"
          >
            Начинки
          </h2>
          <div className="d-flex flex-wrap mt-6">
            {ingredients
              .filter((x) => x.type === "main")
              .map((x) => {
                return (
                  <div key={x._id} onClick={handleOpenModal(x)}>
                    <DragIngredientCard
                      count={newOrder.ingredients.reduce((acc, y) => {
                        if (y._id === x._id) {
                          acc++;
                        }
                        return acc;
                      }, 0)}
                      key={x._id}
                      ingredient={x}
                    />
                  </div>
                );
              })}
          </div>
        </>
      </div>
    </div>
  );
};

export default memo(BurgerIngredients);
