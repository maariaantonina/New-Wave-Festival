# React app connected to DB

**React app connected to MongoDB with Mongoose. See the [DEMO](https://boiling-citadel-51782.herokuapp.com/)**

## Table of Contents

[General info](#general-info)
[Technologies](#technologies)
[Setup](#setup)
[Status](#status)

## General info

This project is a React app connected to MongoDB.

It allows adding new objects to DB using simple form. It also checks if object is already in DB.

## Technologies

Project is created with:

- ReactJS
- Socket.io
- Mongoose

## Setup

To run the server:

### `nodemon server.js` or `yarn start `

Allows connection to DB.

In the client directory, you can run:

### `yarn start `

Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### `yarn test:watch`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Status

Main goals:

- [x] update heroku app,
- [x] fix Content Security Policy directive problem,
- [x] add some data to mongo atlas,
- [x] add number of tickets left,
- [x] change Prices page to use db,
- [ ] do some unit tests.
