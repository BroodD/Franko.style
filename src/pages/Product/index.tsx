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
  IonTitle,
} from "@ionic/react";
import { connect } from "../../data/connect";
import { RouteComponentProps } from "react-router";
import ProductServices from "../../services/product";
import { heart, heartOutline, cartOutline } from "ionicons/icons";
import {
  addOrRemoveLoved,
  addToCart,
  setError,
  setLoading,
} from "../../data/sessions/sessions.actions";
import "./index.scss";
import { IProduct } from "../../models/Product";
import ErrorPage from "../../components/ErrorPage";
import { useTranslation } from "react-i18next";

interface OwnProps extends RouteComponentProps {
  params?: any;
}

interface StateProps {
  isLoggedin: boolean;
  loading?: boolean;
}

interface DispatchProps {
  addOrRemoveLoved: typeof addOrRemoveLoved;
  addToCart: typeof addToCart;
  setError: typeof setError;
  setLoading: typeof setLoading;
}

interface ProductProps extends OwnProps, StateProps, DispatchProps {}

const Product: React.FC<ProductProps> = ({
  params,
  isLoggedin,
  loading,
  addOrRemoveLoved,
  addToCart,
  setError,
  setLoading,
}) => {
  const id = +params["id"];
  const [t] = useTranslation();
  const [product, setProduct] = useState<IProduct>();
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    try {
      (async () => {
        if (!isNaN(id)) {
          setLoading(true);
          const res = await ProductServices.getProduct({ id });
          const resProduct = res.data.product;

          if (resProduct) {
            setProduct(resProduct);
            const isUniversal = Object.keys(resProduct.sizes).includes(
              "universal"
            );
            if (isUniversal) setSelectedSize("universal");
          }
          setLoading(false);
        }
      })();
    } catch (err) {
      setLoading(false);
    }
  }, [id]);

  return (
    <IonPage>
      {product ? (
        <Fragment>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/home"></IonBackButton>
              </IonButtons>
              <IonTitle>{product.name}</IonTitle>
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
            <IonSlides
              className="product__slides"
              pager={true}
              options={{
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
                  <h3>{t("price")}: </h3>
                </IonLabel>
                <IonItemDivider>
                  <IonLabel>{product.price} грн</IonLabel>
                </IonItemDivider>
              </IonItemGroup>
              <IonItemGroup>
                <IonLabel>
                  <h3>{t("sizes")}: </h3>
                </IonLabel>
                {Object.keys(product.sizes).map((key) => (
                  <IonButton
                    fill={selectedSize === key ? "outline" : "clear"}
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
                {t("add_to_cart")}
              </IonButton>
              <div className="product__description">
                <p className="heading ion-text-uppercase">{t("description")}</p>
                {product.description}
              </div>
            </IonCardContent>
          </IonContent>
        </Fragment>
      ) : (
        !loading && (
          <ErrorPage
            error="product_not_found"
            image="assets/img/not_found.svg"
          ></ErrorPage>
        )
      )}
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, ownProps) => ({
    params: ownProps.match.params,
    isLoggedin: state.user.isLoggedin,
    loading: state.data.loading,
  }),
  mapDispatchToProps: {
    addOrRemoveLoved,
    addToCart,
    setError,
    setLoading,
  },
  component: Product,
});
