# COMP30022 Capstone Project

## Description

The problem being addressed is that almost every family has items they may want to pass down the generations. Photographs, letters, previous items such as art or jewellery, items of cultural significance are examples.

The intention of this web application is to allow an individual to effectively catalog family artefacts that they may want to pass down the generations over the years in different countries.

## Tech Stack

#### Front End
- React.js
- Redux
- React-Bootstrap
- React-Semantic-UI

#### Back End
- Express.js server
- Firebase (auth + data storage)

## Usage

#### Development
 
The folder structure has been organised so that `client` represents the React.js app and `server` represents the Node.js (Express.js) back-end that has been integrated with Firebase.

After you clone the repository, run `npm i` in the `client` folder, as well as in the `functions` sub-folder within `server`. This will install all the necessary dependencies on your system.

To deploy the React application, navigate into the `client` folder and run `npm start`. This should fire up a local instance of the application on `localhost:3000` on your default web-browser.

To deploy the express.js server _locally_, navigate into the `server` folder and run `firebase serve`. A sequence of logs should appear on the CLI along with a base access URL to the api (http://localhost:5000/comp30022app/us-central1/api/).

To commit changes and deploy the server _globally_, do the same as mentioned above, but instead of running `firebase serve`, run `firebase deploy`. 

If you wish to test the app, you can login using the following test accounts:

- **Primary User**

   username : `pu@test.com`
   
   password : `password`

- **Secondary User**

   username : `su@test.com`
   
   password : `password`

**Note**: A service key is required to read/write from firebase.

#### Production

A production version of the website has been deployed at https://comp30022app.firebaseapp.com/ .

## Build Status - *Incomplete*

The application is currently in its final stages of development and is being tested.

## Development Team

* Adam Turner
* Michael Manoussakis
* Grace Sng
* Shevon Mendis
* Shubham Rawal (Supervisor)
