# Treasure (COMP30022 Capstone Project)

## Description

The problem being addressed is that almost every family has items they may want to pass down the generations. Photographs, letters, previous items such as art or jewellery, items of cultural significance are examples.

The intention of this web application is to allow an individual to effectively catalog family artefacts that they may want to pass down the generations over the years in different countries.

## Tech Stack

### Front End
- React.js
- Redux
- React-Bootstrap
- React-Semantic-UI

### Back End
- Express.js server
- Firebase (auth + data storage)

## Usage

### Development

The directory structure has been organised so that `client` represents the React.js app and `server` represents the Node.js (Express.js) back-end that has been integrated with Firebase.

After you clone the repository, run `npm i` in the `client` directory, as well as in the `functions` sub-directory within `server`. This will install all the necessary dependencies on your system.

To deploy the React application, navigate into the `client` directory and run `npm start`. This should fire up a local instance of the application on `localhost:3000` on your default web-browser.

To deploy the express.js server _locally_, navigate into the `server` directory and run `firebase serve`. A sequence of logs should appear on the CLI along with a base access URL to the api (http://localhost:5000/comp30022app/us-central1/api/).

To commit changes and deploy the server _globally_, do the same as mentioned above, but instead of running `firebase serve`, run `firebase deploy`.

**Note**: A service key is required to read/write from firebase.

### Testing

#### Manual Testing

The following accounts are available for testing:

- **Primary User**

   username : `pu@test.com` | password : `password`

- **Secondary User**

   username : `su@test.com` | password : `password`

#### Automated Testing

The app was tested using Cypress(https://www.cypress.io/).

In order to run the test suites:
- Navigate to the `client` directory and run `npm start` to run the app locally.
- Run `npm run cypress:open` on your terminal. This will fire up the Cypress app.
- Open the `test_suites` directory and select the suit you wait to run.

### Production

A production version of the website has been deployed at https://comp30022app.firebaseapp.com/ .

## Build Status - *Incomplete*

The application is currently in its final stages of development and is being tested.

## Development Team

* Adam Turner
* Michael Manoussakis
* Grace Sng
* Shevon Mendis
* Shubham Rawal (Supervisor)
