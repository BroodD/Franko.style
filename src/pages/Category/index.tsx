import React, { useEffect, useState, Fragment } from "react";
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonImg,
  IonLabel,
  IonIcon,
  IonList,
  IonAvatar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { connect } from "../../data/connect";
import * as selectors from "../../data/selectors";
import { ICategory } from "../../models/Category";
import { RouteComponentProps } from "react-router";
import ProductCard from "../../components/ProductCard";
import PageHeader from "../../components/PageHeader";
import ProductService from "../../services/product";
import { setError } from "../../data/sessions/sessions.actions";
import { IProduct } from "../../models/Product";
import ErrorPage from "../../components/ErrorPage";
import { chevronForward } from "ionicons/icons";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  category?: ICategory;
}

interface DispatchProps {
  setError: typeof setError;
}

interface CategoryProps extends OwnProps, StateProps, DispatchProps {}

const Category: React.FC<CategoryProps> = ({ category, setError }) => {
  const [products, setProducts] = useState<any>([]);
  const [page, setPage] = useState<number>(1);

  const loadProducts = () => {
    if (category && !category.children.length)
      (async function () {
        try {
          const res = await ProductService.getProductsByCategory({
            id: category.id,
            page,
          });
          const newProducts = res.data.products;
          if (newProducts) {
            setProducts(products.concat(newProducts));
            setPage(page + 1);
          }
        } catch (error) {
          setError(error);
        }
      })();
  };

  const handleScrollEnd = async (e: any) => {
    await loadProducts();
    e.target.complete();
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    loadProducts();
    // return () => {
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  if (!category) {
    return <ErrorPage error="not_found" image="assets/img/not_found.svg" />;
  }

  return (
    <IonPage>
      <PageHeader title={category.name} back />
      <IonContent>
        {category.children && category.children.length ? (
          <IonList>
            {category.children.map((cat: ICategory) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="categories__list"
              >
                <IonItem>
                  {cat.image && (
                    <IonAvatar slot="start">
                      <IonImg src={cat.image} />
                    </IonAvatar>
                  )}
                  <IonLabel>{cat.name}</IonLabel>
                  <IonIcon icon={chevronForward} slot="end" />
                </IonItem>
              </Link>
            ))}
          </IonList>
        ) : (
          <Fragment>
            <IonGrid>
              <IonRow>
                {products.map((p: IProduct) => (
                  <IonCol size="6" key={p.id}>
                    <ProductCard
                      id={p.id}
                      name={p.name}
                      loved={p.loved}
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
        )}
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, ownProps) => ({
    category: selectors.getCategory(state, ownProps),
  }),
  mapDispatchToProps: {
    setError,
  },
  component: Category,
});
