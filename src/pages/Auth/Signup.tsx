import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonRow,
  IonCol,
  IonButton,
  IonInput,
  IonText,
  IonGrid,
  IonImg,
  IonIcon,
} from "@ionic/react";
import "./Login.scss";
import { setIsLoggedIn, setUserProfile } from "../../data/user/user.actions";
import { connect } from "../../data/connect";
import { RouteComponentProps } from "react-router";
import {
  mailOutline,
  lockClosedOutline,
  arrowForward,
  callOutline,
} from "ionicons/icons";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth";
import { useTranslation } from "react-i18next";

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUserProfile: typeof setUserProfile;
}

interface LoginProps extends OwnProps, DispatchProps {}

const Login: React.FC<LoginProps> = ({
  setIsLoggedIn,
  history,
  setUserProfile,
}) => {
  const [t] = useTranslation();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({ phone: "", email: "", password: "" });

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    try {
      const user = await AuthService.signUp({
        phone,
        email,
        password,
      });

      await setIsLoggedIn(true);
      await setUserProfile({
        ...user.data.user,
        token: user.data.token,
      });
      history.push("/home", { direction: "none" });
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        typeof err.response.data.error == "object"
      ) {
        setErrors(err.response.data.error);
      }
    }
  };

  return (
    <IonPage id="login-page">
      <IonContent>
        <IonGrid className="height-100 padding-0 flex-column ion-justify-content-between">
          <form noValidate onSubmit={login} className="auth__top">
            <IonRow className="ion-justify-content-center">
              <IonCol size="7">
                <IonImg src="assets/img/logo.svg" />
              </IonCol>
            </IonRow>

            <IonRow className="ion-justify-content-center">
              <IonCol size="10">
                <IonInput
                  name="phone"
                  type="tel"
                  placeholder="Телефон"
                  className="field"
                  mode="md"
                  value={phone}
                  spellCheck={false}
                  autocapitalize="off"
                  onIonChange={(e) => setPhone(e.detail.value!)}
                  required
                >
                  <IonIcon slot="start" icon={callOutline} />
                </IonInput>

                {formSubmitted && errors.phone && (
                  <IonText color="danger">
                    <p className="ion-padding-start field__error">
                      {t(errors.phone)}
                    </p>
                  </IonText>
                )}

                <IonInput
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="field"
                  mode="md"
                  value={email}
                  spellCheck={false}
                  autocapitalize="off"
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  required
                >
                  <IonIcon slot="start" icon={mailOutline} />
                </IonInput>

                {formSubmitted && errors.email && (
                  <IonText color="danger">
                    <p className="ion-padding-start field__error">
                      {t(errors.email)}
                    </p>
                  </IonText>
                )}

                <IonInput
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  className="field"
                  mode="md"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                >
                  <IonIcon icon={lockClosedOutline} />
                </IonInput>

                {formSubmitted && errors.password && (
                  <IonText color="danger">
                    <p className="ion-padding-start field__error">
                      {t(errors.password)}
                    </p>
                  </IonText>
                )}
              </IonCol>
            </IonRow>

            <IonRow className="ion-justify-content-center">
              <IonCol size="10">
                <IonButton
                  type="submit"
                  shape="round"
                  expand="block"
                  className="shadow-0 btn-padd"
                >
                  <IonIcon slot="start" icon={arrowForward} />
                  {t("signup")}
                </IonButton>
              </IonCol>
            </IonRow>
          </form>

          <Link to="login">
            <IonRow className="auth__bottom ion-text-center">
              <IonCol>
                <p className="ion-text-uppercase">{t("login")}</p>
              </IonCol>
            </IonRow>
          </Link>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUserProfile,
  },
  component: Login,
});
