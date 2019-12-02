const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    exampleRouter = require('../routes/examples.server.routes'),
    mail = require("../controllers/mail.js"),
    emailList = require("../controllers/emailList.server.controller"),
    insta_update = require("../controllers/blog.server.controller"),
    homeCtrl = require("../controllers/home.server.controller"),
    tileCtrl = require("../controllers/tile.server.controller"),
    loginCtrl = require("../controllers/login.server.controller"),
    headerController = require("../controllers/header.server.controller");


const multer = require('multer');
const upload = multer();

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
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

    var tokens = [];
    function tokenStruct() {
        this.tokenString = null;
        this.time = new Date();
    }
    const checkToken = (token) => {
        var boolie = false;
        currDate = new Date();
        tokens.forEach((element, index) => {
            console.log(token);
            console.log(element.tokenString);
            if (element.tokenString === token) {
                if (Math.floor((currDate - element.time) / 1000 / 60 < 45)) {
                    boolie = true;

                }
                else {
                    tokens.splice(index, 1);
                    console.log("expired token");
                }
            }
        });

        return boolie;
    }
    const deleteToken = (token) => {
        tokens.forEach((element, index) => {
            if (element.tokenString === token) {
                tokens.splice(index, 1);

            }
        });
        return;

    }


     exports.generateToken = () => {
        var tokenBoi = new tokenStruct();
        tokenBoi.tokenString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        tokens.push(tokenBoi);
        return tokenBoi.tokenString;
    }
    var storage = multer.diskStorage({
        destination: './files',

        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    })

    var upload = multer({ storage: storage })

    app.post("/api/send_email", function (req, res) {
        req.body.receiver = 'fowardgrowth@yahoo.com';
        req.body.receiverName = 'forwardgrowth';
        mail.request(req, res);
    });

    app.post("/api/add_email", function (req, res) {
        emailList.create(req, res);
    });
    app.post("/api/list_serve", function (req, res) {
        if (checkToken(req.body.token)) {
            emailList.listServe(req, res);

        }
        else {
            res.status(401).send('{"message":"Current Session Timed out. Please Login Again."}');
        }
    });
    app.post("/api/removeEmailee", function (req, res) {
        if (checkToken(req.body.token)) {
            emailList.delete(req, res);

        }
        else {
            res.status(401).send('{"message":"Current Session Timed out. Please Login Again."}');
        }

    });
    app.post("/api/update_insta", function (req, res) {
        if (checkToken(req.body.token)) {
            insta_update.update(req, res);

        }
        else {
            res.status(401).send('{"message":"Current Session Timed out. Please Login Again."}');
        }
    });
    app.get("/api/instagramlink", function (req, res) {
        insta_update.get(req, res);
    }); 
    app.post("/api/update_home", function (req, res) {
        
        if (checkToken(req.body.token)) {
            homeCtrl.update(req, res);

        }
        else {
            res.status(401).send('{"message":"Current Session Timed out. Please Login Again."}');
        }
    });
    app.get("/api/get_home", function (req, res) {
        homeCtrl.get(req, res);
    });
    app.post("/api/add_tile", upload.single('file'), function (req, res) {
        if (checkToken(req.body.token)) {
            tileCtrl.add(req, res);

        }
        else {
            res.status(401).send('{"message":"Current Session Timed out. Please Login Again."}');
        }
    });
    app.post("/api/delete_tile", function (req, res) {
        if (checkToken(req.body.token)) {
            tileCtrl.delete(req, res);

        }
        else {
            res.status(401).send('{"message":"Current Session Timed out. Please Login Again."}');
        }
    });
    app.get("/api/get_tile", function (req, res) {
        tileCtrl.get(req, res);
    });
    app.post("/api/login", function (req, res) {
        //res.status(200).send(generateToken());
        loginCtrl.login(req, res);
    });
    app.post("/api/token", function (req, res) {
        //console.log("test");
        deleteToken(req.body.token);
        res.status(200).send('{"message":"Token gone; reduced to atoms"}');
    });
    /*app.post("/api/check_token", function (req, res) {
        if (checkToken(req.body.token)) {
            res.status(200).send('{"message":"True"}');
        }
        else {
            res.status(401).send('{"message:"False"}');
        }
    
    })*/
    app.post("/api/passyBoi", function (req, res) {
        if (checkToken(req.body.token)) {
            loginCtrl.passUpdate(req, res);

        }
        else {
            res.status(401).send('{"message":"Current Session Timed out. Please Login Again."}');
        }

    });
    app.post("/api/update_tile", upload.single('file'), function (req, res) {
        tileCtrl.update(req, res);
    });
    app.post("/api/add_header", upload.single('file'), function (req, res) {
        headerController.add(req, res);
    });
    app.get("/api/get_header", function (req, res) {
        headerController.get(req, res);
    });
    app.post("/api/update_header", upload.single('file'), function (req, res) {
        headerController.update(req, res);
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

    return app;
    }
