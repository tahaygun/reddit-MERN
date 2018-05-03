import React, { Component } from "react";
import axios from "axios";
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      updateMode: false,
      value: this.props.post.post
    };

    axios
      .get(process.env.REACT_APP_SECRET_CODE + "/api/current_user")
      .then(user => {
        this.setState({ user: user.data });
      });
    this.deleteHandler = this.deleteHandler.bind(this);
    this.voteHandler = this.voteHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openToUpdate = this.openToUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  deleteHandler(e) {
    axios
      .delete(
        process.env.REACT_APP_SECRET_CODE +
          "/api/postdelete/" +
          this.props.post._id
      )
      .then(res => {
        this.props.pageRefresh();
      });
  }
  voteHandler() {
    axios
      .post(
        process.env.REACT_APP_SECRET_CODE +
          "/api/postupvote/" +
          this.props.post._id
      )
      .then(res => {
        this.props.pageRefresh();
      });
  }
  openToUpdate() {
    this.setState({ updateMode: true });
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_SECRET_CODE +
          "/api/update/" +
          this.props.post._id,
        {
          post: this.state.value
        }
      )
      .then(res => {
        this.props.pageRefresh();
        return this.setState({ updateMode: false });
      });
  }
  render() {
    var post = this.props.post;
    return (
      <div>
        {this.state.updateMode ? (
          <form className="p-4" onSubmit={this.handleSubmit}>
            <textarea
              onChange={this.handleChange}
              value={this.state.value}
              className="form-control"
              rows={2}
            />
            <button className="btn btn-warning" type="Submit">
              Update
            </button>
          </form>
        ) : (
          <div className="card">
            <h5 className="card-header">
              posted by <b> {post.user.username}</b> / at{" "}
              <b>{post.createdAt.slice(0, 10)} </b>
            </h5>
            <div className="card-body">
              <h5 className="card-title">{post.post}</h5>
              <p className="card-text">{post.vote} likes</p>
              <button
                onClick={this.voteHandler}
                className="btn btn-sm btn-primary"
              >
                +1
              </button>
              {this.state.user &&
                this.state.user._id === post.user._id && (
                  <div>
                    <p
                      className="btn btn-warning btn-sm"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete this post?"
                          )
                        )
                          this.deleteHandler();
                      }}
                    >
                      Delete
                    </p>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={this.openToUpdate}
                    >
                      Update
                    </button>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Post;
