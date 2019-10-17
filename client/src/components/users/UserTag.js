import React, { Component } from 'react'

class UserTag extends Component {
    render() {
        return (
            <div
                className="user-tag">
                <img
                    className="user-img"
                    src={this.props.imgSrc}
                    width="25"
                    height="25"
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
