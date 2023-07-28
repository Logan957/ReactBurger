import {
  BurgerIcon,
  Button,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <div className="d-flex d-row">
      <Button htmlType="button" type="secondary" size="large">
        <BurgerIcon type="primary" />
        <span className="ms-2">Конструктор</span>
      </Button>

      <Button htmlType="button" type="secondary" size="large">
        <ListIcon type="secondary" />
        <span className="ms-2">Лента заказа</span>
      </Button>

      <Button htmlType="button" type="secondary" size="large">
        <ProfileIcon type="secondary" />
        <span className="ms-2">Личный кабинет</span>
      </Button>

      <Logo />
    </div>
  );
};

export default AppHeader;
