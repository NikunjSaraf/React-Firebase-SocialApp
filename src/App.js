import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import NavBar from "./components/layout/NavBar";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./utils/theme";
import AuthRoute from "./utils/AuthRoute";
import jwtDecode from "jwt-decode";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userAction";
import axios from "axios";
import User from "./pages/user";
import user from "./pages/user";

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL =
  "https://us-central1-react-social-app-2e14f.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  //console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
    localStorage.clear();
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact={true} path="/" component={Home}></Route>
                <AuthRoute
                  exact={true}
                  path="/login"
                  component={Login}
                ></AuthRoute>
                <AuthRoute
                  exact={true}
                  path="/signup"
                  component={SignUp}
                ></AuthRoute>
                <Route
                  exact={true}
                  path="/users/:handle"
                  component={User}
                ></Route>
                <Route
                  exact={true}
                  path="/users/:handle/scream/:screamId"
                  component={user}
                ></Route>
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
export default App;
