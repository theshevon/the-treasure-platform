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

// A heart button that toggles between filled heart and outlined heart
class LikeButton extends Component {

	state = {
		liked: false,
	}

	componentDidMount(){
		this.setState({ liked : this.props.liked });
	}

	handleClick = () => {

		this.setState({
			liked: !this.state.liked
		});

		//  send update request to server
		axios({
					method: 'put',
					url: `/items/${this.props.itemID}/int/users/${this.props.user.id}`,
				})
				.then(res => {
					// do nothing
				})
				.catch(err => {
					// reverse the selection
					this.setState({
						liked: !this.state.liked
					});
				})
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

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStatesToProps = (state) => ({
	user : state.user,
});

export default connect(mapStatesToProps)(LikeButton);