# Introduction

A simple post reader application. Live Demo link: https://supermetrics-task.herokuapp.com/

## Features

- Simple login (shows error from backend if invalid credentials).
- Simple posts list that shows users and posts side-by-side.
- Redirect from post view to login view once token is expired.
- User list can be filtered by typing in the search bar. Supports clicking on an user to filter for posts by that user.
- Post list can be filtered by typing in the search bar. Supports different ordering.
- Support deep linking to post list i.e. can go to `.../posts/user_16` to load only posts from that user.

# Installation

In the project directory, run:

- `npm i`

# Development mode

In the project directory, run:

- `npm run start`

# Production mode

In the project directory, run:

- `npm run build`
- `npm run serve`

# Tests

In the project directory, run:

- `npm run test`
