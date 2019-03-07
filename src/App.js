import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import Transactions from "./pages/Transactions";
import { firebaseAuth } from "./config/firebase";
import { Container, Section } from "bloomer";
import Nav from "./components/Nav";

import "bulma/css/bulma.min.css";

function PrivateRoute({ component: Component, authed, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} userId={user} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
  // return (
  //   <Route
  //     {...rest}
  //     render={props =>
  //       <Component {...props} userId={user} />
  //     }
  //   />
  // );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

class App extends Component {
  state = {
    authed: false,
    user: ""
  };

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          user: user.uid
        });
      } else {
        this.setState({
          authed: false,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <Router>
        <>
          <Nav />
          <Section>
            <Container>
              <Switch>
                <PrivateRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  exact
                  path="/"
                  component={Home}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/transactions"
                  component={Transactions}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/upload"
                  component={Upload}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/categories"
                  component={Categories}
                />
                <PublicRoute
                  authed={this.state.authed}
                  path="/login"
                  component={Login}
                />
              </Switch>
            </Container>
          </Section>
        </>
      </Router>
    );
  }
}

export default App;
