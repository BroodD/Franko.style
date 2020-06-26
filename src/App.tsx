import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
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
import "./theme/global.scss";

import Home from "./pages/Home";
import { connect } from "./data/connect";
import { AppContextProvider } from "./data/AppContext";
import { loadCategories } from "./data/sessions/sessions.actions";
import {
  setIsLoggedIn,
  setUserProfile,
  loadUserData,
} from "./data/user/user.actions";
import More from "./pages/More";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Loved from "./pages/Loved";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Product from "./pages/Product";
import Tutorial from "./pages/Tutorial";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import About from "./pages/About";
import ErrorToast from "./components/ErrorToast";
import {
  homeOutline,
  heartOutline,
  ellipsisHorizontal,
  cartOutline,
} from "ionicons/icons";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  loading: boolean;
  stateLang: string;
}

interface DispatchProps {
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUserProfile: typeof setUserProfile;
  loadCategories: typeof loadCategories;
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
  loading,
  stateLang,
  setIsLoggedIn,
  setUserProfile,
  loadUserData,
  loadCategories,
}) => {
  const [, i18n] = useTranslation();
  useEffect(() => {
    loadUserData();
    loadCategories();
  }, []);
  useEffect(() => {
    i18n.changeLanguage(stateLang);
  }, [stateLang]);

  return loading ? (
    <div></div>
  ) : (
    <IonApp>
      <IonReactRouter>
        <ErrorToast />

        <IonTabs>
          <IonRouterOutlet id="main-content">
            <Route path="/tutorial" component={Tutorial} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/loved" component={Loved} />
            <Route path="/more" component={More} />
            <Route path="/account" component={Account} />
            <Route path="/categories" component={Categories} />
            <Route path="/category/:id" component={Category} exact />
            <Route path="/product/:id" component={Product} />
            <Route
              path="/logout"
              render={() => {
                setIsLoggedIn(false);
                setUserProfile({});
                return <Redirect to="/login" />;
              }}
            />
            <Route path="/" component={Home} exact />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={homeOutline} />
            </IonTabButton>
            <IonTabButton tab="cart" href="/cart">
              <IonIcon icon={cartOutline} />
            </IonTabButton>
            <IonTabButton tab="map" href="/loved">
              <IonIcon icon={heartOutline} />
            </IonTabButton>
            <IonTabButton tab="more" href="/more">
              <IonIcon icon={ellipsisHorizontal} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    loading: state.user.loading,
    stateLang: state.user.lang,
  }),
  mapDispatchToProps: {
    loadUserData,
    setIsLoggedIn,
    setUserProfile,
    loadCategories,
  },
  component: IonicApp,
});
