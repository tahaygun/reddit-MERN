import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import axios from 'axios';
import Home from "./JoinPage/Home";
import Main from "./MainPage/Main";
// import Showlisting from "./Mainpage/Showlisting";
// import Postlisting from "./Mainpage/Postlisting";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/mainpage" component={Main} />
        </Switch>
      </Router>
    );
  }
}

export default App;
