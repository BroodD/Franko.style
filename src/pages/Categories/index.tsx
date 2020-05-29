import React from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonImg,
  IonIcon,
  IonAvatar,
} from "@ionic/react";
import "./index.scss";
import { connect } from "../../data/connect";
import { ICategory } from "../../models/Category";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { chevronForward } from "ionicons/icons";
import PageHeader from "../../components/PageHeader";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  categories: ICategory[];
}

interface DispatchProps {}

interface CategoriesProps extends OwnProps, StateProps, DispatchProps {}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <IonPage>
      <PageHeader title="" back />
      <IonContent>
        <IonList>
          {categories
            .filter((cat) => cat.parentId === null)
            .map((cat) => (
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
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    categories: state.data.categories,
  }),
  mapDispatchToProps: {},
  component: Categories,
});
