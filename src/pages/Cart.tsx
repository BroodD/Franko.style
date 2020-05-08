import React, { useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { connect } from "../data/connect";
import ProductCard from "../components/ProductCard";
import { RouteComponentProps } from "react-router";
import { loadCartProducts } from "../data/sessions/sessions.actions";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  products: any[];
  isLoggedin: boolean;
}

interface DispatchProps {
  loadCartProducts: typeof loadCartProducts;
}

interface LovedProps extends OwnProps, StateProps, DispatchProps {}

const Loved: React.FC<LovedProps> = ({
  products,
  isLoggedin,
  loadCartProducts,
}) => {
  const handleScrollEnd = async (e: any) => {
    await loadCartProducts(products.length);
    e.target.complete();
  };

  useEffect(() => {
    loadCartProducts(0, !isLoggedin);
  }, [isLoggedin, loadCartProducts]);

  return (
    <IonPage>
      {/* <IonContent scrollEvents={true} onIonScrollEnd={handleScrollEnd}> */}
      <IonContent>
        <p className="page__title">Кошик</p>
        <IonGrid>
          <IonRow>
            {products.map((p) => (
              <IonCol size="6" key={p.id}>
                <ProductCard id={p.id} name={p.name} loved={true} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonInfiniteScroll onIonInfinite={handleScrollEnd}>
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    products: state.data.cart,
    isLoggedin: state.user.isLoggedin,
  }),
  mapDispatchToProps: {
    loadCartProducts,
  },
  component: Loved,
});
