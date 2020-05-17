import React, { useEffect } from "react";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonBackButton,
  IonButtons,
  IonButton,
} from "@ionic/react";
import "./index.scss";
import { connect } from "../../data/connect";
import { ICategory } from "../../models/Category";
import { loadCategories } from "../../data/sessions/sessions.actions";
import { RouteComponentProps, Redirect } from "react-router";
import { Link } from "react-router-dom";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  categories: ICategory[];
}

interface DispatchProps {
  loadCategories: typeof loadCategories;
}

interface CategoriesProps extends OwnProps, StateProps, DispatchProps {}

const Categories: React.FC<CategoriesProps> = ({
  categories,
  loadCategories,
}) => {
  useEffect(() => {
    loadCategories();
  }, []);

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
        <p className="page__title">categories list</p>
        {categories
          .filter((cat) => cat.parentId === null)
          .map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="categories__list"
            >
              {cat.name} - {cat.id}
            </Link>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    categories: state.data.categories,
  }),
  mapDispatchToProps: {
    loadCategories,
  },
  component: Categories,
});
