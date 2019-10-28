// react imports
import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import axios                from 'axios';

// redux stuff
import { connect } from 'react-redux';

// custom css
import '../../stylesheets/item.css';

// custom icons
import likedBtn   from '../../icons/liked.svg';
import unlikedBtn from '../../icons/unliked.svg';

/**
 * A heart-shaped button that toggles between a filled heart and outlined heart
 * to represent a user's interest in a catalogued item.
 */
class LikeButton extends Component {

	state = {
		liked: false,
	}

	componentDidMount(){
		this.setState({ liked : this.props.liked });
	}

	/**
	 * Handles a user's EOI by sending a request to the server to make the
	 * relevant updates to the item's `intUsers` field.
	 */
	handleClick = () => {

		this.setState({
			liked: !this.state.liked
		});

		//  send update request to server
		axios({
					method: 'put',
					url: `/items/${this.props.itemID}/intUsers`,
				})
				.then(res => {
					// do nothing
				})
				.catch(err => {
					// reverse the selection
					this.setState({
						liked: !this.state.liked
					});
				});
	}

	render() {

		let label = this.state.liked ? "liked" : "unliked";

		return (
			<div className="customContainer">

				{/* `like` button */}
				<button className="like-btn">

					{/* heart-shaped image */}
					<img
						alt="item"
						src= { label === "liked" ? likedBtn : unlikedBtn }
						onClick={ this.handleClick }
						width={this.props.size === "sm" ? "25" : "35"}
						height={this.props.size === "sm" ? "25" : "35"}/>
				</button>

			</div>
		);
	}
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStatesToProps = (state) => ({
	user : state.user,
});

export default connect(mapStatesToProps)(LikeButton);