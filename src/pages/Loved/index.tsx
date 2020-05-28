import React, { useEffect, Fragment } from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { connect } from "../../data/connect";
import ProductCard from "../../components/ProductCard";
import ErrorPage from "../../components/ErrorPage";
import { RouteComponentProps } from "react-router";
import { loadLovedProducts } from "../../data/sessions/sessions.actions";
import PageHeader from "../../components/PageHeader";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  products: any[];
  isLoggedin: boolean;
}

interface DispatchProps {
  loadLovedProducts: typeof loadLovedProducts;
}

interface LovedProps extends OwnProps, StateProps, DispatchProps {}

const Loved: React.FC<LovedProps> = ({
  products,
  isLoggedin,
  loadLovedProducts,
}) => {
  const handleScrollEnd = async (e: any) => {
    await loadLovedProducts(products.length);
    e.target.complete();
  };

  useEffect(() => {
    loadLovedProducts(0, !isLoggedin);
  }, [isLoggedin, loadLovedProducts]);

  return (
    <IonPage>
      <IonContent>
        <PageHeader title="loved" />
        {isLoggedin ? (
          !products.length ? (
            <ErrorPage error="empty_loved" image="assets/img/empty_loved.svg" />
          ) : (
            <Fragment>
              <IonGrid>
                <IonRow>
                  {products.map((p) => (
                    <IonCol size="6" key={p.id}>
                      <ProductCard
                        id={p.id}
                        name={p.name}
                        loved={true}
                        image={p.image}
                        sizes={p.sizes}
                        price={p.price}
                      />
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>

              <IonInfiniteScroll onIonInfinite={handleScrollEnd}>
                <IonInfiniteScrollContent></IonInfiniteScrollContent>
              </IonInfiniteScroll>
            </Fragment>
          )
        ) : (
          <ErrorPage error="you_are_not_authorized" />
        )}
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    products: state.data.loved,
    isLoggedin: state.user.isLoggedin,
  }),
  mapDispatchToProps: {
    loadLovedProducts,
  },
  component: Loved,
});
