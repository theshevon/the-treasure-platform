import React, { Component } from 'react';

// custom css
import '../stylesheets/error.css';

// icons
import errorIcon from '../icons/error.svg';

/**
 * Represents an `error` page for when a user tries to either access a private
 * route, or a route that doesn't exist.
 */
class Error extends Component {
    render() {
        return (
            <div
                className="error-page d-flex align-items-center justify-content-center">
                <img
                    className="img-fluid mr-4"
                    src={errorIcon}
                    height="75"
                    width="75"
                    alt="error-logo">
                </img>
                <h1
                    className="text-center">
                    Sorry, this page does not exist!
                </h1>
            </div>
        )
    }
}

export default Error;
