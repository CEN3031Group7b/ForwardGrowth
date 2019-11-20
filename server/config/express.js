const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    exampleRouter = require('../routes/examples.server.routes'),
    mail = require("../controllers/mail.js"),
    emailList = require("../controllers/emailList.server.controller"),
    insta_update = require("../controllers/blog.server.controller"),
    homeCtrl = require("../controllers/home.server.controller");



module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || 'mongodb+srv://ForwardGrowth:Secure_Password7@database-q25ho.mongodb.net/test?retryWrites=true&w=majority'/*require('./config').db.uri*/, {
        useNewUrlParser: true
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());

    app.post("/api/send_email", function (req, res) {
        req.body.receiver = 'fowardgrowth@yahoo.com';
        req.body.receiverName = 'forwardgrowth';
        mail.request(req, res);



    });

    app.post("/api/add_email", function (req, res) {
        emailList.create(req, res);
    });
    app.post("/api/list_serve", function (req, res) {
        emailList.listServe(req, res);
    });
    app.post("/api/update_insta", function (req, res) {
        insta_update.update(req, res);
    });
    app.get("/api/instagramlink", function (req, res) {
        insta_update.get(req, res );
    });
    app.post("/api/update_home", function (req, res) {
        homeCtrl.update(req, res);
    });
    app.get("/api/get_home", function (req, res) {
        homeCtrl.get(req, res);
    });
    // add a router
    app.use('/api/example', exampleRouter);

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
}

