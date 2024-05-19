import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import Header from "./components/Header";
import Progress from "./components/Progress";

const AuthLazyApp = lazy(() => import("./components/AuthApp"));
const MarketingLazyApp = lazy(() => import("./components/MarketingApp"));
const DashboardLazyApp = lazy(() => import("./components/DashboardApp"));

const history = createBrowserHistory();
const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazyApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazyApp />
              </Route>
              <Route path="/" component={MarketingLazyApp} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
