import React, { Fragment, useState } from "react";
import {
  IonCardHeader,
  IonCardContent,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { remove, add } from "ionicons/icons";
import "./index.scss";

interface CartChangeCountProps {
  cartId: number;
  initialCount: number;
  maxCount: number;
  price: number;
  onChangeCount: (cartId: number, count: number) => void;
  onDismiss: () => void;
}

const CartChangeCount: React.FC<CartChangeCountProps> = ({
  cartId,
  initialCount,
  maxCount,
  price,
  onChangeCount,
  onDismiss,
}) => {
  const [count, setCount] = useState(initialCount);

  return (
    <Fragment>
      <IonCardHeader className="change__header">
        <IonButton
          fill="clear"
          size="small"
          color="dark"
          onClick={() => (count > 1 ? setCount(count - 1) : undefined)}
        >
          <IonIcon slot="icon-only" icon={remove}></IonIcon>
        </IonButton>
        <h3 className="change__count">{count}</h3>
        <IonButton
          fill="clear"
          size="small"
          color="dark"
          onClick={() => (count < maxCount ? setCount(count + 1) : undefined)}
        >
          <IonIcon slot="icon-only" icon={add}></IonIcon>
        </IonButton>
      </IonCardHeader>

      <IonCardContent className="change__body">
        <div className="change__row">
          <p>Вартість товару </p>
          <h3>{price} грн</h3>
        </div>
        <div className="change__row">
          <p>Разом </p>
          <h3>{price * count} грн</h3>
        </div>
      </IonCardContent>

      <IonCardContent className="change__buttons">
        <IonButton
          expand="block"
          color="dark"
          size="large"
          onClick={() => onChangeCount(cartId, count)}
        >
          Змінити
        </IonButton>

        <IonButton
          expand="block"
          fill="clear"
          color="dark"
          size="large"
          onClick={() => onDismiss()}
        >
          Скасувати
        </IonButton>
      </IonCardContent>
    </Fragment>
  );
};

export default CartChangeCount;
