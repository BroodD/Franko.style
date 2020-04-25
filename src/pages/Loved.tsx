import React from "react";
import { IonPage, IonContent } from "@ionic/react";

interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  return (
    <IonPage>
      <IonContent>
        <h1>Loved</h1>
      </IonContent>
    </IonPage>
  );
};

export default Cart;
