import React, { Component } from "react";
// import axios from 'axios';
class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav navbar-nav" />

          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
              <span
                className="nav-link cursor-pointer"
                onClick={this.props.logoutHandler}
              >
                Logout
              </span>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
