# ForwardGrowth
*Purpose of this project:*

This website will be a landing page for "Backpack Adventurers," an application created by a start-up called Forward Growth. "Backpack Adventurers" is a mobile application aimed towards high school and college students. The developers of this website used the MERN stack to create this website. 

*Deploying:*
Currently the application is deployed on Heroku (https://forwardgrowth.herokuapp.com/). 
To deploy on Heroku, the "Config Vars" in the settings must be set. 
To deploy locally, a config.js file should be made in the root with proper environment variables. 
The following keys must be set: Mongo DB URI, public mailjet key, and the private mailjet key. 

## Layout and Features:
### Home Page:
* Dynamic, editable text about the mobile application including information that may be userful to the users of "Backpack Adventurers"
* Link to download the "Backpack Adventurers" application 
* Sign up form for users to subscribe to a newsletter from the creators of the mobile application 
![Alt text](/Screenshots/HomePage1.png?raw=true "Home")
![Alt text](/Screenshots/HomePage2.png?raw=true "Home")
![Alt text](/Screenshots/HomePage3.png?raw=true "Home")

### About the Team Page: 
* Cards including pictures, name, and position title of the team members who are creating "Backpack Adventurers"
* "Contact Us" form where users can send Forward Growth an email
![Alt text](/Screenshots/About1.png?raw=true "About")
![Alt text](/Screenshots/About2.png?raw=true "About")
![Alt text](/Screenshots/About3.png?raw=true "About")

### Blog Page: 
* Includes Forward Growth's embedded Twitter timeline and Instagram post
![Alt text](/Screenshots/Blog1.png?raw=true "Blog")

### Admin Dashboard: 
* The client of this application can login edit the website and interact with users. 
* Editable features: changing admin password, header image, edit text on the "Home" page, update App store link to "Backpack Adventurers", update/delete/add team members to the "About the Team" page, edit the Instragram post features on the "Blog" page, and sending a newletter to those who subscribed through the "Home" page. 
![Alt text](/Screenshots/Admin1.png?raw=true "Admin")
![Alt text](/Screenshots/Admin2.png?raw=true "Admin")
![Alt text](/Screenshots/Admin3.png?raw=true "Admin")
![Alt text](/Screenshots/Admin4.png?raw=true "Admin")


## Credits
For this project, the developers utilized the following resources. 

### Requirements/Packages

npm install bootstrap

npm install react-burger-menu --save

npm install --save react-twitter-embed

npm i react-instagram-embed

npm install node-mailjet 

npm install react-collapsible --save

npm install --save jimp

npm install react-slick --save

npm install slick-carousel

npm install password-hash

npm install --save multer

## Available Scripts
**The following text in this section is taken from the README file from the MERN Template used to create this application. The template was provided by the user: @UFWebApps.**

Since this project will hold both the client application and the server application there will be node modules in two different places. First run `npm install` from the root. After this you will run `npm run-script install-all` from the root. 

In the project directory, you can run:

### `npm run-script dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run-script client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `npm run-script server`

Runs just the server in development mode.<br>


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

If deploying to heroku this does not need to be run since it is handled by the heroku-postbuild script<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
