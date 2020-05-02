import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Network } from "@ionic-native/network";
import Menu from "./components/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/global.css";

import Home from "./pages/Home";
import { connect } from "./data/connect";
import { AppContextProvider } from "./data/AppContext";
import { loadConfData } from "./data/sessions/sessions.actions";
import {
  setIsLoggedIn,
  setUserProfile,
  loadUserData,
} from "./data/user/user.actions";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Loved from "./pages/Loved";
import Cart from "./pages/Cart";
import Tutorial from "./pages/Tutorial";
import HomeOrTutorial from "./components/HomeOrTutorial";
import { Schedule } from "./models/Schedule";
import { home, cart, heart, person } from "ionicons/icons";

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  schedule: Schedule;
  user: any;
}

interface DispatchProps {
  loadConfData: typeof loadConfData;
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUserProfile: typeof setUserProfile;
}

interface IonicAppProps extends StateProps, DispatchProps {}

// function PrivateRoute({ children, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         user. ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// }

const IonicApp: React.FC<IonicAppProps> = ({
  schedule,
  user,
  setIsLoggedIn,
  setUserProfile,
  loadConfData,
  loadUserData,
}) => {
  const [networkState, setNetworkState] = useState(false);
  const [connection, setConnection] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    loadUserData();
    loadConfData();
    // eslint-disable-next-line

    Network.onChange().subscribe((status) => {
      console.log("--- status", status);
    });
  }, []);

  const getNetwork = () => {
    const type = Network.type;
    console.log("--- type", type, Network.downlinkMax);

    const change = Network.onChange().subscribe((status) => {
      setNetworkState(!!status);
    });
    console.log(change);

    Network.onDisconnect().subscribe((status) => {
      console.log("disconect", status);
      setNetworkState(!!status);
    });

    Network.onConnect().subscribe((status) => {
      console.log("conect", status);
      setNetworkState(!!status);
    });
  };

  return schedule.groups.length === 0 ? (
    <div></div>
  ) : (
    <IonApp>
      <IonButton onClick={getNetwork}>Network</IonButton>
      <h1>net: {networkState + " its"}</h1>
      {/* <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />

          <IonTabs>
            <IonRouterOutlet id="main">
              <Route path="/tutorial" component={Tutorial} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/home" component={Home} />
              <Route path="/cart" component={Cart} />
              <Route path="/loved" component={Loved} />
              <Route path="/account" component={Account} />
              <Route
                path="/logout"
                render={() => {
                  setIsLoggedIn(false);
                  setUserProfile({});
                  return <Redirect to="/login" />;
                }}
              />
              <Route path="/" component={HomeOrTutorial} exact />
              <Route path="*" component={HomeOrTutorial} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
              </IonTabButton>
              <IonTabButton tab="cart" href="/cart">
                <IonIcon icon={cart} />
              </IonTabButton>
              <IonTabButton tab="map" href="/loved">
                <IonIcon icon={heart} />
              </IonTabButton>
              <IonTabButton tab="account" href="/account">
                <IonIcon icon={person} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonSplitPane>
      </IonReactRouter> */}
    </IonApp>
  );
};

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    schedule: state.data.schedule,
    user: state.user,
  }),
  mapDispatchToProps: {
    loadConfData,
    loadUserData,
    setIsLoggedIn,
    setUserProfile,
  },
  component: IonicApp,
});
