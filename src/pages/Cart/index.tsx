import React, { useEffect, Fragment, useState, useRef } from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonButton,
  IonIcon,
  IonChip,
  IonLabel,
  IonModal,
  IonCardContent,
  IonActionSheet,
} from "@ionic/react";
import { connect } from "../../data/connect";
import CartChangeCount from "../../components/CartChangeCount";
import { RouteComponentProps } from "react-router";
import {
  loadCartProducts,
  updateCountCart,
  removeCart,
} from "../../data/sessions/sessions.actions";
import { ICartProduct } from "../../models/CartProduct";
import ErrorPage from "../../components/ErrorPage";
import PageHeader from "../../components/PageHeader";
import { ellipsisHorizontal, pencil, trash, close } from "ionicons/icons";
import "./index.scss";
import { Link } from "react-router-dom";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  cartProducts: ICartProduct[];
  isLoggedin: boolean;
}

interface DispatchProps {
  loadCartProducts: typeof loadCartProducts;
  updateCountCart: typeof updateCountCart;
  removeCart: typeof removeCart;
}

interface LovedProps extends OwnProps, StateProps, DispatchProps {}

const Loved: React.FC<LovedProps> = ({
  cartProducts,
  isLoggedin,
  loadCartProducts,
  updateCountCart,
  removeCart,
}) => {
  const [modalCartId, setModalCartId] = useState(0);
  const [actionSheetCartId, setActionSheetCartId] = useState(0);
  const modalRef = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    loadCartProducts(!isLoggedin);
  }, [isLoggedin]);

  const handleChangeCount = (cartId: number, count: number) => {
    updateCountCart(cartId, count);
    if (modalRef.current) modalRef.current.dismiss();
  };

  return (
    <IonPage>
      <IonContent>
        <PageHeader title="cart" />
        {isLoggedin ? (
          !cartProducts.length ? (
            <ErrorPage error="empty_cart" image="assets/img/empty_cart.svg" />
          ) : (
            <Fragment>
              <IonGrid className="cart-grid">
                {cartProducts.map((cartProduct) => {
                  const product = cartProduct.product;
                  const size = cartProduct.selectedSize;
                  const maxCount = product.sizes[size];
                  return (
                    <IonRow key={cartProduct.id}>
                      <IonCol size="4" className="cart__image">
                        <Link to={`/product/${product.id}`}>
                          <IonImg src={product.image}></IonImg>
                        </Link>
                      </IonCol>
                      <IonCol size="6">
                        <p className="cart__name">{product.name}</p>
                        <div className="cart__info">
                          <IonChip className="cart__chip cart__chip--medium">
                            <IonLabel>{cartProduct.selectedSize}</IonLabel>
                          </IonChip>
                          <IonChip className="cart__chip">
                            <IonLabel>{cartProduct.count} шт</IonLabel>
                            <IonIcon
                              icon={pencil}
                              onClick={() => setModalCartId(cartProduct.id)}
                            />
                          </IonChip>
                        </div>
                        <p className="cart__price">{product.price} грн.</p>
                      </IonCol>
                      <IonCol size="2">
                        <IonButton
                          fill="clear"
                          shape="round"
                          size="small"
                          onClick={() => setActionSheetCartId(cartProduct.id)}
                        >
                          <IonIcon
                            slot="icon-only"
                            icon={ellipsisHorizontal}
                          ></IonIcon>
                        </IonButton>
                      </IonCol>
                      <IonModal
                        ref={modalRef}
                        isOpen={modalCartId === cartProduct.id}
                        onDidDismiss={() => setModalCartId(0)}
                        cssClass="cart__modal"
                      >
                        <CartChangeCount
                          cartId={cartProduct.id}
                          initialCount={cartProduct.count}
                          price={product.price}
                          maxCount={maxCount}
                          onChangeCount={handleChangeCount}
                          onDismiss={() =>
                            modalRef.current
                              ? modalRef.current.dismiss()
                              : undefined
                          }
                        />
                      </IonModal>
                    </IonRow>
                  );
                })}
              </IonGrid>

              <IonCardContent className="cart__confirm ion-text-center">
                <p>Разом:</p>
                <div className="cart__total">
                  {cartProducts.reduce((prev, current) => {
                    const amount: number =
                      prev + current.product.price * current.count;
                    return amount;
                  }, 0)}{" "}
                  грн
                </div>
                <IonButton expand="block" color="dark">
                  Оформити замовлення
                </IonButton>
              </IonCardContent>

              <IonActionSheet
                isOpen={!!actionSheetCartId}
                onDidDismiss={() => setActionSheetCartId(0)}
                cssClass="my-custom-class"
                buttons={[
                  {
                    text: "Delete",
                    role: "destructive",
                    icon: trash,
                    handler: () => {
                      removeCart(actionSheetCartId);
                    },
                  },
                  {
                    text: "Cancel",
                    icon: close,
                    role: "cancel",
                  },
                ]}
              ></IonActionSheet>
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
    cartProducts: state.data.cart,
    isLoggedin: state.user.isLoggedin,
  }),
  mapDispatchToProps: {
    loadCartProducts,
    updateCountCart,
    removeCart,
  },
  component: Loved,
});
