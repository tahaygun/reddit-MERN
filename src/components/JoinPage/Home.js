import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
export default class Home extends Component {
  constructor(props) {
    super(props);
    document.title = "Join to Reddit";
  }

  render() {
    return (
      <div>
        <h3 className="header">Welcome to Reddit</h3>
        <Login history={this.props.history} />
        <br />
        <Register />
      </div>
    );
  }
}
