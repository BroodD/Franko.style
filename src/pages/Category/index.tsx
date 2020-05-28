import React, { useEffect, useState, Fragment } from "react";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonBackButton,
  IonButtons,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
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
  }, [category]);

  if (!category) {
    return <div>Session not found</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
            <IonButton></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PageHeader title={category.name} />
        {category.children && category.children.length ? (
          category.children.map((cat: ICategory) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="categories__list"
            >
              {cat.name} - {cat.id}
            </Link>
          ))
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
