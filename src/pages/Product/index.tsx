import React, { useEffect, useState, Fragment } from "react";
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
  IonItemDivider,
  IonLabel,
  IonCardContent,
  IonItemGroup,
  IonItem,
} from "@ionic/react";
import { connect } from "../../data/connect";
import { RouteComponentProps } from "react-router";
import ProductServices from "../../services/product";
import { heart, heartOutline, cartOutline } from "ionicons/icons";
import {
  addOrRemoveLoved,
  addToCart,
  setError,
} from "../../data/sessions/sessions.actions";
import "./index.scss";
import { IProduct } from "../../models/Product";

interface OwnProps extends RouteComponentProps {
  params?: any;
}

interface StateProps {
  isLoggedin: boolean;
}

interface DispatchProps {
  addOrRemoveLoved: typeof addOrRemoveLoved;
  addToCart: typeof addToCart;
  setError: typeof setError;
}

interface ProductProps extends OwnProps, StateProps, DispatchProps {}

const Product: React.FC<ProductProps> = ({
  params,
  isLoggedin,
  addOrRemoveLoved,
  addToCart,
  setError,
}) => {
  const id = +params["id"];
  const [product, setProduct] = useState<IProduct>();
  const [selectedSize, setSelectedSize] = useState<string>("");
  // const slideRef = useRef<HTMLIonSlidesElement>(null);

  // const handleSlideLoad = () => {
  //   setTimeout(() => {
  //     console.log("--- slider reaload");
  //     slideRef.current!.update();
  //     // .then(() => {
  //     // slideRef.current!.slideTo(0);
  //     // });
  //   }, 100);
  // };

  useEffect(() => {
    (async () => {
      if (!isNaN(id)) {
        const res = await ProductServices.getProduct({ id });
        const resProduct = res.data.product;

        if (resProduct) {
          setProduct(resProduct);
          const isUniversal = Object.keys(resProduct.sizes).includes(
            "universal"
          );
          if (isUniversal) setSelectedSize("universal");
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
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {product ? (
          <Fragment>
            <IonSlides
              // ref={slideRef}
              className="product__slides"
              // onIonSlidesDidLoad={handleSlideLoad}
              pager={true}
              options={{
                // slidesPerView: "auto",
                spaceBetween: 0,
                zoom: true,
              }}
            >
              {product.images.map((img: string, index: number) => {
                return (
                  <IonSlide key={index} className="product__slide">
                    <IonImg className="product__image" src={img} />
                  </IonSlide>
                );
              })}
            </IonSlides>
            <IonCardContent>
              <h1>{product.name}</h1>
              <IonItemGroup>
                <IonLabel>
                  <h3>Ціна: </h3>
                </IonLabel>
                <IonItemDivider>
                  <IonLabel>{product.price} грн</IonLabel>
                </IonItemDivider>
              </IonItemGroup>
              <IonItemGroup>
                <IonLabel>
                  <h3>Розміри: </h3>
                </IonLabel>
                {Object.entries(product.sizes).map(([key, value]) => (
                  <IonButton
                    fill={selectedSize == key ? "outline" : "clear"}
                    key={key}
                    onClick={() => setSelectedSize(key)}
                  >
                    {key}
                  </IonButton>
                ))}
              </IonItemGroup>
              <IonButton
                expand="block"
                onClick={() => {
                  addToCart(id, selectedSize);
                }}
              >
                <IonIcon icon={cartOutline} />
                Додати у кошик
              </IonButton>
              <div className="product__description">
                <p className="heading ion-text-uppercase">Опис</p>
                МатеріалЖ микрофибра Вставки из замши, еко кожи и дихаючої сетки
              </div>
            </IonCardContent>
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
    addToCart,
    setError,
  },
  component: Product,
});
