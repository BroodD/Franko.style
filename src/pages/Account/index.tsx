import React, { Fragment, useState } from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCardContent,
} from "@ionic/react";
import "./index.scss";
import { connect } from "../../data/connect";
import { RouteComponentProps } from "react-router";
import ErrorPage from "../../components/ErrorPage";
import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  isLoggedin: boolean;
  user: any;
}

interface DispatchProps {}

interface AccountProps extends OwnProps, StateProps, DispatchProps {}

const Account: React.FC<AccountProps> = ({ isLoggedin, user }) => {
  const [t] = useTranslation();
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  return (
    <IonPage>
      <PageHeader title="account" back />
      <IonContent>
        {isLoggedin ? (
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonInput
                  value={email}
                  placeholder="Email"
                  onIonChange={(e: CustomEvent) => setEmail(e.detail.value)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  value={phone}
                  placeholder="Phone"
                  onIonChange={(e: CustomEvent) => setPhone(e.detail.value)}
                ></IonInput>
              </IonItem>
              <IonButton expand="block" color="dark">
                {t("change")}
              </IonButton>
            </IonList>
            <IonList>
              <Link to="logout">
                <IonItem>
                  <IonLabel>{t("logout")}</IonLabel>
                </IonItem>
              </Link>
            </IonList>
          </IonCardContent>
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
    user: state.user,
  }),
  mapDispatchToProps: {},
  component: Account,
});
