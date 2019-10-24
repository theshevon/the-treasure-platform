import React, { Component } from 'react'

class UserTag extends Component {
    render() {
        return (
            <div
                className="user-tag">
                <img
                    className="user-img border-on mr-2"
                    src={this.props.imgSrc}
                    width="35"
                    height="35"
                    alt="user_img">
                </img>
                <p>
                    {this.props.name}
                </p>

            </div>
        )
    }
}

export default UserTag
