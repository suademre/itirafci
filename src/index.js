import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import firebase from "./firebase";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./features/auth/Login";
import SignUp from "./features/auth/SingUp";
import NoMatch from "./components/NoMatch";
import PrivateRoute from "./components/PrivateRoute";
import "semantic-ui-css/semantic.min.css";
import { setCurrentUser } from "./features/auth/authSlice";

const rffProps = {
  firebase,
  config: {
    userProfile: "users",
    enableLogging: false,
  },
  dispatch: store.dispatch,
};

const Root = ({ history }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setCurrentUser(user));
      } else {
        history.push("/login");
      }
    });
  }, []);

  return (
    <Switch>
      <PrivateRoute exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={SignUp} />
      <Route component={NoMatch} />
    </Switch>
  );
};

const RootWithAuth = withRouter(Root);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rffProps}>
        <Router>
          <RootWithAuth />
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
