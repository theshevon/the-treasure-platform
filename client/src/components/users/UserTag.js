import React, { Component } from 'react'

/**
 * Represents a capsule-shaped tag that contains a user's image and their
 * name.
 */
class UserTag extends Component {
    render() {
        return (
            <div
                className="user-tag">

                {/* the user's image */}
                <img
                    className="user-img border-on mr-2"
                    src={this.props.imgSrc}
                    width="35"
                    height="35"
                    alt="user_img">
                </img>

                {/* the user's name */}
                <p>
                    {this.props.name}
                </p>
            </div>
        );
    }
}

export default UserTag;
