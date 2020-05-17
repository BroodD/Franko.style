import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { setError } from "../data/sessions/sessions.actions";
import { useTranslation } from "react-i18next";
import { IonToast } from "@ionic/react";

import { connect } from "../data/connect";

interface StateProps {
  error: string;
}

interface DispatchProps {
  setError: typeof setError;
}

interface ErrorToastProps
  extends RouteComponentProps,
    StateProps,
    DispatchProps {}

const ErrorToast: React.FC<ErrorToastProps> = ({
  history,
  error,
  setError,
}) => {
  const { t } = useTranslation();
  return (
    <IonToast
      isOpen={!!error}
      position="top"
      message={t(error)}
      duration={3000}
      onDidDismiss={() => setError("")}
      buttons={
        error === "you_are_not_authorized"
          ? [
              {
                text: "Авторизуватися",
                handler: () => {
                  history.push("/login");
                },
              },
            ]
          : []
      }
    />
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    error: state.data.error,
  }),
  mapDispatchToProps: {
    setError,
  },
  component: withRouter(ErrorToast),
});
