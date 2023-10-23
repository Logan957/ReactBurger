import React, { ReactNode, memo } from "react";
import { useDrop } from "react-dnd";
import { TIngredient } from "../../services/types/ingredient-type";

interface Props {
  children: ReactNode;
  onDropHandler: (item: TIngredient) => void;
}

const DropIngredientTarget: React.FC<Props> = ({ children, onDropHandler }) => {
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: { ingredient: TIngredient }) {
      onDropHandler(item.ingredient);
    },
  });

  return (
    <div data-test-id={"drop_zone"} ref={dropTarget}>
      {children}
    </div>
  );
};

export default memo(DropIngredientTarget);
