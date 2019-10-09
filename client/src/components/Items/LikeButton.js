// react imports
import React, { Component } from "react"

// custom stylesheets
import "../../stylesheets/item.css"

// custom icons
import likedBtn   from "../../icons/liked.svg"
import unlikedBtn from "../../icons/unliked.svg";

// A heart button that toggles between filled heart and outlined heart
class LikeButton extends Component {

	state = {
		liked: false,
	}

	// TODO:
	// Integration: send axios request to up
	handleClick = () => {
		this.setState({
						liked: !this.state.liked
					});
	}

	render() {

		let label = this.state.liked ? "liked" : "unliked";

		return (
			<div className="customContainer">
				<button className="like-btn">
				<img
					alt="item"
					src= { label === "liked" ? likedBtn : unlikedBtn }
					onClick={ this.handleClick }
					width="25"
					height="25"
				/>
				</button>
			</div>
		);
	}
}
export default LikeButton;
