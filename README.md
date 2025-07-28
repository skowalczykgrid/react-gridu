# To run:

In on terminal run: npm start
In second: npm run json-server

# Final task for React course

This repo contains final project requirements and template for [GridU React course](https://gridu.litmos.com/home/LearningPath/26572?r=False&ts=637785982384795974). You should fork it and complete the task in the forked repository.

## Requirements

We're building "Another Twitter Clone" app that resembles basic functionality of, you guessed it, Twitter. App contains the total of 3 pages (see [mockups](#mockups) for visual guidelines):

1. Login - allows user to enter email and password (both required), validates them on UI (see [validation rules](#validation)), sends request to login endpoint (see [mock server docs](#mock_server)) on form submition and redirects to tweets page if the response code is 200. Shows "Invalid email or password" message if the response code is 404. Shows "Something went wrong" message for other error codes.

2. Signup - allows user to enter email, password and full name (all required), validates them on UI (see [validation rules](#validation)), sends request to signup endpoint (see [mock server docs](#mock_server)) on form submition and redirects to tweets page if the response code is 200. Shows "Something went wrong" message for error response codes.

3. Tweets - fetches tweets (see [mock server docs](#mock-server)) and displays them in a list. Also allows user to create a tweet by typing it into the text input (see [validation rules](#validation)) and clicking "Tweet", after that app should consequently 1) send request to create tweet (see [mock server docs](#mock-server)) and 2) refectch tweets list.

## Mockups

See [PDF](twitter-clone.pdf) and [Figma](twitter-clone.fig) files in this repo. Please note that these mockups are just visual guidelines, not final designs. You're encouraged to apply creativity, use color pallete and UI elements of your choice (components library usage recommended to save time, but not required).

## Validation

If the input is touched and invalid it should be highlighted red and display "Invalid ..." message.

### Email

[Pretty complex syntax](https://en.wikipedia.org/wiki/Email_address#Syntax), we recommend to use [validation library](https://github.com/manishsaraan/email-validator)

### Password

Minimum length 8 symbols, maximum length 256 symbols.

### Full name

Minimum 1 symbol, maximum 512 symbols.

### Tweet text

Minimum 1 symbol, maximum 140 symbols (we're cloning old-school Twitter here). Tweet text also supports HTML markdown - if user puts `<strong>LOL</strong>` it should be rendered as bold text in the tweet later (look out for injection attacks here, sanitization needed).

## Project template

There's React app template inside `twitter-clone` directory (created using `create-react-app`). That's where your work will happen, just fork this repo and change the contents of this directory as you wish. `README.md` there has all the needed instructions.

## Mock server

There's `db.json` file in repo root. Feed it into [JSON Server](https://github.com/typicode/json-server) to GET your mock API. Make sure to check [documentation](https://github.com/typicode/json-server#getting-started) to know how to get and update your data.

The command to do it (port is specified to avoid conflict with React app):

```shell
json-server --watch db.json --port 3001
```

### Authentication

For the sake of simplicity login-signup process is severely simplified.

> :warning: **Mock server stores passwords as plain text**: Don't enter any sensitive data while testing. Never store passwords as plain text in real applications.

#### Login

In order to log user in you need to try getting them by username (like `http://localhost:3000/users/johnsmith`), if you got 200 and user - login successfull, if 404 - username or password wrong.

#### Signup

In order to sign user up just `POST` the form contents to `http://localhost:3000/users`, 200 response means signup was succesfull and user is authenticated now.

#### Storing logged in user

You can store logged in user data in `localStorage` for simplicity.

## Help

In case you get stuck or have questions/suggestions for this repo feel free to create GitHub issue or reach people from "Professors" field in [GridU React course](https://gridu.litmos.com/home/LearningPath/26572?r=False&ts=637785982384795974).
