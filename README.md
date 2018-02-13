# Jam-Clash

### An Application to find fun new people to play music with. Developed using
* node.js
* express
* sequelize
* mongoDB
* firebase
* passport
* nodemailer
* materialize

### Description
This application is a  full stack application with a front end constructed using HTML/CSS and elements from the Materialize framework. The backend constructed with Node.js and Express connecting to mongoDB for a news feed, Sequelize for user authentication and firebase for photo storage. 

The user may create an account which stores their location to be rendered in searches. Once a user creates an account they can search for other users within the proximity they define, who play select instruments or are searching for new members to join a band. The user may also search by username. Once a search has been performed the user is shown all users within their network who meet the parameters of the search. The user may then view the profiles and message other users. Users also have an option to update their profiles and delete them if they so desire. Our news section scrapes NPR for the latest in music news.


### Installation
#### To run the application locally, first clone this repository with the following command.

* git clone git@github.com:ckontos/final-project.git

* Next cd into final-project and run an npm install.

* Finally, run the node server locally by typing 'node server.js'

* Now, open the local application on port 3000 at the URL: http://localhost:3000/.

* Create an account, browse and meet new people!