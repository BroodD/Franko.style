import React from "react";
import { RouteComponentProps, withRouter, useLocation } from "react-router";

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";
import { hammer, help, logIn, logOut, person, personAdd } from "ionicons/icons";

import { connect } from "../data/connect";

import "./Menu.css";

const routes = {
  loggedInPages: [
    { title: "Account", path: "/account", icon: person },
    { title: "Support", path: "/support", icon: help },
    { title: "Logout", path: "/logout", icon: logOut },
  ],
  loggedOutPages: [
    { title: "Login", path: "/login", icon: logIn },
    { title: "Signup", path: "/signup", icon: personAdd },
    { title: "Support", path: "/support", icon: help },
  ],
};

interface Pages {
  title: string;
  path: string;
  icon: string;
  routerDirection?: string;
}
interface StateProps {
  isAuthenticated: boolean;
}

interface DispatchProps {}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps {}

const Menu: React.FC<MenuProps> = ({ history, isAuthenticated }) => {
  const location = useLocation();

  function renderlistItems(list: Pages[]) {
    return list
      .filter((route) => !!route.path)
      .map((p) => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem
            detail={false}
            routerLink={p.path}
            routerDirection="none"
            className={
              location.pathname.startsWith(p.path) ? "selected" : undefined
            }
          >
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>Account</IonListHeader>
          {isAuthenticated
            ? renderlistItems(routes.loggedInPages)
            : renderlistItems(routes.loggedOutPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Tutorial</IonListHeader>
          <IonItem
            button
            onClick={() => {
              history.push("/tutorial");
            }}
          >
            <IonIcon slot="start" icon={hammer} />
            Show Tutorial
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    isAuthenticated: state.user.isLoggedin,
  }),
  mapDispatchToProps: {},
  component: withRouter(Menu),
});
