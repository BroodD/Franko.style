import React from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonImg,
} from "@ionic/react";
import "./index.scss";
import { connect } from "../../data/connect";
import { RouteComponentProps } from "react-router";
import { chevronForward } from "ionicons/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setLang } from "../../data/user/user.actions";
import PageHeader from "../../components/PageHeader";

const routes = [
  { title: "account", path: "/account" },
  { title: "about", path: "/about" },
];

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  stateLang: string;
}

interface DispatchProps {
  setLang: typeof setLang;
}

interface MoreProps extends OwnProps, StateProps, DispatchProps {}

const More: React.FC<MoreProps> = ({ stateLang, setLang }) => {
  const [t] = useTranslation();
  return (
    <IonPage>
      <PageHeader title="more" />
      <IonContent>
        <IonListHeader>{t("language")}</IonListHeader>
        <IonSegment
          value={stateLang}
          className="lang__segment"
          onIonChange={(e) => {
            setLang(e.detail.value as string);
          }}
        >
          <IonSegmentButton value="uk">
            <IonImg src="assets/icon/uk.svg" />
          </IonSegmentButton>
          <IonSegmentButton value="ru">
            <IonImg src="assets/icon/ru.svg" />
          </IonSegmentButton>
        </IonSegment>

        <IonList>
          {routes.map((route, index) => (
            <Link to={route.path} key={index}>
              <IonItem>
                <IonLabel>{t(route.title)}</IonLabel>
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
    stateLang: state.user.lang,
  }),
  mapDispatchToProps: {
    setLang,
  },
  component: More,
});
