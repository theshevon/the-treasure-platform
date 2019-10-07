// react imports
import React, { Component } from "react";

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
  }

  render() {
    const label = this.state.liked ? "like" : "unlike";
    return (
      <div className="customContainer">
        <button className="like-btn">
          <img
            alt="item"
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
