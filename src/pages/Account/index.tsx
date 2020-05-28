import React, { Fragment } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import "./index.scss";
import { connect } from "../../data/connect";
import { RouteComponentProps } from "react-router";
import ErrorPage from "../../components/ErrorPage";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  isLoggedin: boolean;
}

interface DispatchProps {}

interface AccountProps extends OwnProps, StateProps, DispatchProps {}

const Account: React.FC<AccountProps> = ({ isLoggedin }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Акаунт</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p className="page__title">Акаунт</p>
        {isLoggedin ? (
          <Fragment />
        ) : (
          <ErrorPage error="you_are_not_authorized" />
        )}
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedin: state.user.isLoggedin,
  }),
  mapDispatchToProps: {},
  component: Account,
});
