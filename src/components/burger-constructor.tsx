import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../utils/data";
import styles from "./burger-constructor.module.css";

//Я тут до конца не понял, как отображать эти карточки, пока мы не можем их сами выбирать, поэтому захардкодил верхнюю и нижнюю булку, а остальное просто замапил
const BurgerConstructor = () => {
  return (
    <div className="mt-25">
      <div className="flex-column">
        <ConstructorElement
          extraClass="ml-8"
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
        <div className={`${styles.constructor_container} pr-2`}>
          {data.map((x) => {
            return (
              <div key={x._id}>
                <div className="d-flex align-items-center mt-4">
                  <DragIcon type="primary" />
                  <ConstructorElement
                    extraClass="ml-2"
                    text={x.name}
                    price={x.price}
                    thumbnail={x.image}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <ConstructorElement
          extraClass="ml-8 mt-4"
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
      </div>

      <div className="d-flex align-items-center mt-10 justify-content-end">
        <div className="d-flex">
          <div className="me-2 text text_type_digits-medium">610</div>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          extraClass="ml-10"
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
