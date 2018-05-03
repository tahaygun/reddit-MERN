import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
// import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: ""
      },
      error: null,
      errors: null,
      isloggedIn: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_SECRET_CODE + "/api/login", this.state.data)
      .then(res => {
        console.log(res);
        if (res.data.errors) {
          return this.setState({ errors: res.data.errors });
        }
        if (res.data.error) {
          return this.setState({ error: res.data.message, errors: null });
        }
        return this.setState({ isloggedIn: true });
      });
  }

  changeHandler(e) {
    var formData = this.state.data;
    formData[e.target.name] = e.target.value;
    this.setState({
      data: formData
    });
  }

  render() {
    var changeHandler = this.changeHandler;
    return this.state.isloggedIn ? (
      <Redirect to="/mainpage" />
    ) : (
      <div className="loginform">
        <h3>Login</h3>
        {this.state.error && <p style={{ color: "red" }}>{this.state.error}</p>}
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              value={this.state.data.email}
              name="email"
              onChange={changeHandler}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            {this.state.errors &&
              this.state.errors.email && (
                <p className="text-danger">{this.state.errors.email.msg}</p>
              )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={changeHandler}
              value={this.state.data.password}
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
            {this.state.errors &&
              this.state.errors.password && (
                <p className="text-danger">{this.state.errors.password.msg}</p>
              )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
