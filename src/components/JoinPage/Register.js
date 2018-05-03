import React, { Component } from "react";
import axios from "axios";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password_con: "",
        username: ""
      },
      errors: null
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_SECRET_CODE + "/api/register",
        this.state.data
      )
      .then(res => {
        if (res.data.errors) {
          console.log(res.data.errors);
          return this.setState({ errors: res.data.errors });
        }
        if (res.data.ok) {
          return this.setState({
            error: "Succesfully registerated",
            errors: null
          });
        }
        console.log(res);
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
    return (
      <div>
        <h3>Register</h3>
        {this.state.error && <p className="btn-danger">{this.state.error}</p>}
        <form onSubmit={this.submitHandler}>
          <div className="row">
            <div className="col">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                onChange={this.changeHandler}
                name="username"
                className="form-control"
                value={this.state.data.username}
                placeholder="Username"
              />
              {this.state.errors &&
                this.state.errors.username && (
                  <p className="text-danger">
                    {" "}
                    {this.state.errors.username.msg}
                  </p>
                )}
            </div>
            <div className="col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={this.changeHandler}
                name="email"
                className="form-control"
                value={this.state.data.email}
                placeholder="Email"
              />
              {this.state.errors &&
                this.state.errors.email && (
                  <p className="text-danger"> {this.state.errors.email.msg}</p>
                )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="firstname">Firstname</label>
              <input
                type="text"
                onChange={this.changeHandler}
                name="firstname"
                className="form-control"
                value={this.state.data.firstname}
                placeholder="Firstname"
              />
              {this.state.errors &&
                this.state.errors.firstname && (
                  <p className="text-danger">
                    {" "}
                    {this.state.errors.firstname.msg}
                  </p>
                )}
            </div>
            <div className="col">
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                onChange={this.changeHandler}
                name="lastname"
                className="form-control"
                value={this.state.data.lastname}
                placeholder="Lastname"
              />
              {this.state.errors &&
                this.state.errors.lastname && (
                  <p className="text-danger">
                    {" "}
                    {this.state.errors.lastname.msg}
                  </p>
                )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={this.changeHandler}
                name="password"
                className="form-control"
                value={this.state.data.password}
                placeholder="Password"
              />
              {this.state.errors &&
                this.state.errors.password && (
                  <p className="text-danger">
                    {" "}
                    {this.state.errors.password.msg}
                  </p>
                )}
            </div>
            <div className="col">
              <label htmlFor="password_con">Password Confirmation</label>
              <input
                type="password"
                onChange={this.changeHandler}
                name="password_con"
                className="form-control"
                value={this.state.data.password_con}
                placeholder="Password Confirm"
              />
              {this.state.errors &&
                this.state.errors.password_con && (
                  <p className="text-danger">
                    {" "}
                    {this.state.errors.password_con.msg}
                  </p>
                )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
