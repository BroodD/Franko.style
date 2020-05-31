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
import { mailOutline, lockClosedOutline, arrowForward } from "ionicons/icons";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", msg: "" });

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await AuthService.login({
        email,
        password,
      });

      await setUserProfile({
        ...user.data.user,
        token: user.data.token,
      });
      await setIsLoggedIn(true);
      history.push("/home", { direction: "none" });
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        typeof err.response.data.error == "object"
      ) {
        setErrors(err.response.data.error);
      } else {
        setErrors({
          email: "",
          password: "",
          msg: err.response ? err.response.data.error : err.message,
        });
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
                {errors.msg && (
                  <IonText color="danger">
                    <p className="ion-padding-start field__error">
                      {t(errors.msg)}
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
                  onFocus={() =>
                    setErrors({ email: "", password: errors.password, msg: "" })
                  }
                  required
                >
                  <IonIcon slot="start" icon={mailOutline} />
                </IonInput>

                {errors.email && (
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
                  onFocus={() =>
                    setErrors({ email: errors.email, password: "", msg: "" })
                  }
                >
                  <IonIcon icon={lockClosedOutline} />
                </IonInput>

                {errors.password && (
                  <IonText color="danger">
                    <p className="ion-padding-start field__error">
                      {t(errors.password)}
                    </p>
                  </IonText>
                )}

                {/* <div className="ion-text-center">
                  <p>Забули пароль?</p>
                </div> */}
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
                  {t("login")}
                </IonButton>
              </IonCol>
            </IonRow>
          </form>

          <Link to="signup">
            <IonRow className="auth__bottom ion-text-center">
              <IonCol>
                <p className="ion-text-uppercase">{t("signup")}</p>
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
