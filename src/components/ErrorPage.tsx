import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { IonGrid, IonImg, IonRow, IonCol, IonButton } from "@ionic/react";

import { connect } from "../data/connect";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface OwnProps {
  error: string;
}
interface StateProps {}

interface DispatchProps {}

interface ErrorPageProps
  extends RouteComponentProps,
    OwnProps,
    StateProps,
    DispatchProps {}

const ErrorPage: React.FC<ErrorPageProps> = ({ history, error }) => {
  const { t } = useTranslation();
  return (
    <IonGrid>
      <IonRow className="ion-justify-content-center ion-text-center">
        <IonCol size="7">
          <IonImg src="assets/img/logo.svg" />
          <p>{t(error)}</p>
          <Link to="/login">
            <IonButton shape="round" className="shadow-0 btn-padd">
              Авторизуватися
            </IonButton>
          </Link>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default connect<OwnProps, StateProps, {}>({
  mapStateToProps: (state, ownProps) => ({
    error: ownProps.error,
  }),
  mapDispatchToProps: {},
  component: withRouter(ErrorPage),
});
