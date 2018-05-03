import React, { Component } from "react";
import axios from "axios";

class Postinput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: ""
    };
    this.handlePostMessage = this.handlePostMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_SECRET_CODE + "/api/addpost", {
        post: this.state.post
      })
      .then(res => {
        this.setState(res.data);
        this.setState({ post: "" });
        return this.props.pageRefresh();
      })
      .catch(err => console.log(err));
  }
  handlePostMessage(e) {
    this.setState({ post: e.target.value });
  }
  render() {
    return (
      <div className="p-4">
        {this.state.errors && (
          <p className="text-danger">{this.state.errors.post.msg}</p>
        )}
        <form onSubmit={this.handleSubmit} className="clearfix">
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Post a message</label>
            <textarea
              onChange={this.handlePostMessage}
              value={this.state.post}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
            />
          </div>
          <button type="submit" className="btn btn-primary float-right">
            Post Message
          </button>
        </form>
      </div>
    );
  }
}

export default Postinput;
