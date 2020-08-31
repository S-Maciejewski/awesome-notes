# "Awesome notes" - a personal notepad app

## Description
The app provides a smart notes interface for the user. Each user can access his personal, secret notes by logging in using only his secret username. No more need for remembering difficult passwords! This application works best with Google Chrome.

```
For testing purposes, there are 3 predefined users: user1, user2 and user3. Each of them has a set of predefined notes.
```

The app provides a set of categories for the notes. The categories can be customised by user (created, modified and deleted). 

User can add notes containing a title, description, category and date. The category for a note is selected from one of the categories defined in the app. A datepicker is present in order to facilitate date input.

Notes cannot be modified upon saving - user can only add or delete notes.
Notes appearing on the list should be sorted by date, then title.

## Task

Unfortunately, despite unlimited potential of the application, the development budget for "Awesome notes" was reduced, as we realized, that there are literally thousands of note-taking web applications. Because of that, a few bugs might have slipped in and we need your help with finding and documenting them for further work.

Seems like good developers left their console logging in place, perhaps this can be useful for testing purposes. 

## Installation instructions
The application consists of two core parts - server in Node.js, located in `/server` and Angular client located in `/client`

### Server setup
In order to run the app, one has to first setup the server. This can be done by running
```
npm install
npm run start
```
in `/server` directory. 
#### Note, that this requires **Node.js, version 10+** and **npm** installed. If those requirements are fulfilled, the server will be accessible on *port 4000*.

### Client setup
In order to setup the client, one has to install it's dependencies and then run angular in serve mode. This can be done by running following commands in `/client` directory.

```
npm install
npm install --save-dev  --unsafe-perm node-sass
ng serve -o
```
This should install dependencies and run the application on localhost, *port 4200* and open the application in default browser (address: `localhost:4200`).
#### Note, that this requires not only **Node.js and npm** installed, but also **Angular in version 7+**.
Angular can be installed with 
```
npm install -g @angular/cli
```