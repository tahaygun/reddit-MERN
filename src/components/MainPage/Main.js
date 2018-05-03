import React, { Component } from "react";
import Post from "./Post";
import axios from "axios";
import Nav from "./Nav";
import Postinput from "./Postinput";
import { Redirect } from "react-router-dom";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      isLoggedIn: true
    };
    document.title = "Reddit Mainpage";
    axios
      .get(process.env.REACT_APP_SECRET_CODE + "/api/isloggedin")
      .then(user => {
        this.setState({ isLoggedIn: user.data });
      });
    this.getPostings = this.getPostings.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.pageRefresh = this.pageRefresh.bind(this);
  }
  getPostings() {
    axios
      .get(process.env.REACT_APP_SECRET_CODE + "/api/showposts")
      .then(post => {
        this.setState({ post: post.data });
      });
  }

  componentDidMount() {
    this.getPostings();
  }
  logoutHandler() {
    axios
      .get(process.env.REACT_APP_SECRET_CODE + "/api/logout")
      .then(answer => {
        this.setState({ isLoggedIn: false });
      });
  }
  pageRefresh() {
    this.getPostings();
  }
  render() {
    return !this.state.isLoggedIn ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Nav logoutHandler={this.logoutHandler} />
        <Postinput pageRefresh={this.pageRefresh} />

        {this.state.post &&
          this.state.post.map(post => {
            return (
              <Post pageRefresh={this.pageRefresh} key={post._id} post={post} />
            );
          })}
      </div>
    );
  }
}

export default Main;
