import React from "react";
import {
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonIcon,
  IonFabButton,
  IonFab,
} from "@ionic/react";
import "./ProductCard.css";
import { heartOutline, heart } from "ionicons/icons";
import { connect } from "../../data/connect";
import { addOrRemoveLoved } from "../../data/sessions/sessions.actions";

interface OwnProps {
  id: number;
  name: string;
  loved: boolean;
}

interface OwnProps {}

interface StateProps {}

interface DispatchProps {
  addOrRemoveLoved: typeof addOrRemoveLoved;
}

interface ProductCardProps extends OwnProps, StateProps, DispatchProps {}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  loved,
  addOrRemoveLoved,
}) => {
  return (
    <div className="product">
      <IonFab
        vertical="top"
        horizontal="end"
        slot="fixed"
        onClick={() => addOrRemoveLoved(id)}
      >
        <IonFabButton
          size="small"
          className={loved ? "product__loved active" : "product__loved"}
        >
          {loved ? <IonIcon icon={heart} /> : <IonIcon icon={heartOutline} />}
        </IonFabButton>
      </IonFab>
      <IonImg src="assets/img/product_1.jpg" />
      <IonCardHeader className="product__header">
        <IonCardTitle className="product__title">{name}</IonCardTitle>
        <IonCardSubtitle className="product__size">xs, s, m, l</IonCardSubtitle>
        <IonCardTitle className="product__price">
          559 грн <del>1400 грн</del>
        </IonCardTitle>
      </IonCardHeader>
    </div>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapDispatchToProps: {
    addOrRemoveLoved,
  },
  component: ProductCard,
});
