import React, { useRef, useEffect, useState, Fragment } from "react";
import {
  IonPage,
  IonContent,
  IonSlides,
  IonSlide,
  IonImg,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonList,
  IonItemDivider,
  IonLabel,
} from "@ionic/react";
import { connect } from "../../data/connect";
import { RouteComponentProps } from "react-router";
import ProductServices from "../../services/product";
import {
  heart,
  heartOutline,
  cartOutline,
  checkmarkOutline,
} from "ionicons/icons";
import {
  addOrRemoveLoved,
  addOrRemoveCart,
  setError,
} from "../../data/sessions/sessions.actions";
import "./index.scss";

interface OwnProps extends RouteComponentProps {
  params?: any;
}

interface StateProps {
  isLoggedin: boolean;
}

interface DispatchProps {
  addOrRemoveLoved: typeof addOrRemoveLoved;
  addOrRemoveCart: typeof addOrRemoveCart;
  setError: typeof setError;
}

interface ProductProps extends OwnProps, StateProps, DispatchProps {}

const Product: React.FC<ProductProps> = ({
  params,
  isLoggedin,
  addOrRemoveLoved,
  addOrRemoveCart,
  setError,
}) => {
  const id = +params["id"];
  const [product, setProduct] = useState({} as any);
  const slideRef = useRef<HTMLIonSlidesElement>(null);

  const handleSlideLoad = () => {
    setTimeout(() => {
      console.log("--- slider reaload");
      slideRef.current!.update().then(() => {
        slideRef.current!.slideTo(0);
      });
    }, 100);
  };

  useEffect(() => {
    (async () => {
      if (!isNaN(id)) {
        const res = await ProductServices.getProduct({ id });

        if (res.data.product) {
          setProduct(res.data.product);
        }
      }
    })();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          {product && (
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  if (isLoggedin) {
                    addOrRemoveLoved(id);
                    setProduct({ ...product, loved: !product.loved });
                  } else {
                    setError("you_are_not_authorized");
                  }
                }}
                className={
                  product.loved ? "product__loved active" : "product__loved"
                }
              >
                {product.loved ? (
                  <IonIcon slot="icon-only" icon={heart} />
                ) : (
                  <IonIcon slot="icon-only" icon={heartOutline} />
                )}
              </IonButton>
              {/* <IonButton>
              <IonIcon slot="icon-only" icon={share}></IonIcon>
            </IonButton> */}
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {product ? (
          <Fragment>
            <IonSlides
              ref={slideRef}
              onIonSlidesDidLoad={handleSlideLoad}
              pager={true}
              options={{
                slidesPerView: "auto",
                spaceBetween: 0,
                zoom: true,
              }}
            >
              <IonSlide className="product__slide">
                <IonImg
                  className="product__image"
                  src="assets/img/product_big.jpg"
                />
              </IonSlide>
              <IonSlide className="product__slide">
                <IonImg
                  className="product__image"
                  src="assets/img/product_big.jpg"
                />
              </IonSlide>
              <IonSlide className="product__slide">
                <IonImg
                  className="product__image"
                  src="assets/img/product_big.jpg"
                />
              </IonSlide>
            </IonSlides>
            <h1>{product.name}</h1>
            <IonList>
              <IonItemDivider>
                <IonLabel>940 грн</IonLabel>
              </IonItemDivider>
            </IonList>
            <IonButton
              expand="block"
              disabled={product.cart}
              onClick={() => {
                addOrRemoveCart(id);
                setProduct({ ...product, cart: !product.cart });
              }}
            >
              <IonIcon icon={product.cart ? cartOutline : checkmarkOutline} />
              {product.cart ? "Вже у кошику" : "Додати у кошик"}
            </IonButton>
            <div className="product__description">
              <p className="heading ion-text-uppercase">Опис</p>
              МатеріалЖ микрофибра Вставки из замши, еко кожи и дихаючої сетки
            </div>
          </Fragment>
        ) : (
          "nothing"
        )}
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, ownProps) => ({
    params: ownProps.match.params,
    isLoggedin: state.user.isLoggedin,
  }),
  mapDispatchToProps: {
    addOrRemoveLoved,
    addOrRemoveCart,
    setError,
  },
  component: Product,
});
