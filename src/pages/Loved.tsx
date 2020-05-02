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
import { loadLovedProducts } from "../data/sessions/sessions.actions";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  products: any[];
  lovedPage: number;
  isLoggedin: boolean;
}

interface DispatchProps {
  loadLovedProducts: typeof loadLovedProducts;
}

interface LovedProps extends OwnProps, StateProps, DispatchProps {}

const Loved: React.FC<LovedProps> = ({
  products,
  lovedPage,
  isLoggedin,
  loadLovedProducts,
}) => {
  const handleScrollEnd = async (e: any) => {
    await loadLovedProducts(lovedPage);
    e.target.complete();
  };

  useEffect(() => {
    if (isLoggedin) loadLovedProducts(lovedPage, true);
  }, [isLoggedin]);

  return (
    <IonPage>
      {/* <IonContent scrollEvents={true} onIonScrollEnd={handleScrollEnd}> */}
      <IonContent>
        <h1>loved</h1>
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
    products: state.data.loved,
    lovedPage: state.data.lovedPage,
    isLoggedin: state.user.isLoggedin,
  }),
  mapDispatchToProps: {
    loadLovedProducts,
  },
  component: Loved,
});
