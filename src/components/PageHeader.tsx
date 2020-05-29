import React from "react";
import { useTranslation } from "react-i18next";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";

interface OwnProps {
  title: string;
  back?: boolean;
}

const PageHeader: React.FC<OwnProps> = ({ title, back }) => {
  const { t } = useTranslation();
  return (
    <IonHeader>
      <IonToolbar>
        {back && (
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
        )}
        <IonTitle>{t(title)}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
  // return <p className="page__title"></p>;
};

export default PageHeader;
