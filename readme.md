# COMP30022 Capstone Project

## Description

The problem being addressed is that almost every family has items they may want to pass down the generations. Photographs, letters, previous items such as art or jewellery, items of cultural significance are examples.

The intention of this web application is to allow an individual to effectively catalog family artefacts that they may want to pass down the generations over the years in different countries.

## Usage

The folder structure has been organised such that `client` represents the React.js app and `server` represents the Node.js (Express.js) back-end that has been integrated with Firebase.

After you clone the repository, you may have to run `npm i` to install all the dependencies in the `client` folder, as well as in the `functions` sub-folder within `server`.

To deploy the React application, navigate into the `client` folder and run `npm start`. This should fire up a local instance of the application on `localhost:3000` on your default web-browser.

To deploy the express.js server locally, navigate into the `server` folder and run `firebase serve`. A sequence of logs should appear on the CLI along with an access URL (http://localhost:5000/comp30022app/us-central1/api/ `route`).

To commit changes and deploy the server globally, do the same as mentioned above, but instead of `firebase serve`, run `firebase deploy`.

**Notes**:
- You may have to run `firebase login` before running `firebase serve` or `firebase deploy`
- A service key is required to make GET requests from firebase.

## Build Status - *Incomplete*

Currently, the login and items page have been implemented.

To test login, start the server, then run the React app. Currently, we have one user, whose credentials are `userx@email.com` and `123456` that leads to a succefully login.

The item page can be used to retrieve and view information about artefacts that have been cataloged.

## Development Team

* Adam Turner
* Michael Manoussakis
* Grace Sng
* Shevon Mendis


