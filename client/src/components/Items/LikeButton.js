// react imports
import React, { Component } from "react";

// react-boostrap imports
import Button from "react-bootstrap/Button";

// custom stylesheets
import "../../stylesheets/item.css";


// A heart button that toggles between filled heart and outlined heart
class LikeButton extends Component {
  constructor() {
    super();
    this.state = {
      liked: false,
      uri: "../icons/like.svg"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      liked: !this.state.liked
    });
    uri: require("../icons/like.svg");
  }

  render() {
    const text = this.state.liked ? "liked" : "haven't liked";
    const label = this.state.liked ? "like" : "unlike";
    return (
      <div className="customContainer">
        <button className="like-btn">
          <img
            src={require("../icons/" + label + ".svg")}
            onClick={this.handleClick}
            width="25"
            height="25"
          />
        </button>
      </div>
    );
  }
}
export default LikeButton;
