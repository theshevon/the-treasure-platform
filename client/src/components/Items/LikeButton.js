// react imports
import React, { Component } from "react"
// import axios from 'axios'

// custom stylesheets
import "../../stylesheets/item.css"

// custom icons
import likedBtn   from "../../icons/liked.svg"
import unlikedBtn from "../../icons/unliked.svg"

// A heart button that toggles between filled heart and outlined heart
class LikeButton extends Component {

	state = {
		liked: false,
	}

	handleClick = () => {
		this.setState({
						liked: !this.state.liked
					});

		//  send update request to server
		// let route = this.state.liked ? "int" : "notint";
		// axios({
		// 		method: 'put',
		// 		url: `http://localhost:5000/comp30022app/us-central1/api/items/${this.props.itemID}/${route}/${this.userId}`,
		// 	  })
		// 	  .then(res => {
		// 		  // do nothing with response
		// 		  return
		// 	  })
		// 	  .catch(err => {
		// 		  // if there was an error, simply reverse the user's action
		// 		  this.handleClick();
		// 	  })
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
					width={this.props.size === "sm" ? "25" : "35"}
					height={this.props.size === "sm" ? "25" : "35"}
				/>
				</button>
			</div>
		);
	}
}
export default LikeButton;
