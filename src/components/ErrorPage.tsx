import React from "react";
import { IonGrid, IonImg, IonRow, IonCol, IonButton } from "@ionic/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface OwnProps {
  error: string;
  image?: string;
}

const ErrorPage: React.FC<OwnProps> = ({ error, image }) => {
  const { t } = useTranslation();
  return (
    <IonGrid>
      <IonRow className="ion-justify-content-center ion-text-center mt-30">
        <IonCol size="7">
          {image ? (
            <IonImg src={image} />
          ) : (
            <IonImg src="assets/img/logo.svg" />
          )}
          <p className="my-20">{t(error)}</p>
          {error === "you_are_not_authorized" && (
            <Link to="/login">
              <IonButton shape="round" className="shadow-0 btn-padd">
                Авторизуватися
              </IonButton>
            </Link>
          )}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ErrorPage;
