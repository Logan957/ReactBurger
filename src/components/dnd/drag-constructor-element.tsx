import React, { memo, useRef } from "react";
import { XYCoord, useDrag, useDrop, DragSourceMonitor } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../services/types/ingredient-type";
import { Identifier } from "typescript";

interface IDragConstructorElementProps {
  ingredient: TIngredient;
  removeIngredient: (index: number) => () => void;
  index: number;
  moveConstructor: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
}

const DragConstructorElement: React.FC<IDragConstructorElementProps> = ({
  ingredient,
  removeIngredient,
  index,
  moveConstructor,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: "constructor_element",
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveConstructor(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructor_element",
    item: () => {
      return { index };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="d-flex align-items-center mt-4"
    >
      <DragIcon type="primary" />
      <ConstructorElement
        extraClass="ml-2"
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={removeIngredient(index)}
      />
    </div>
  );
};

export default memo(DragConstructorElement);
