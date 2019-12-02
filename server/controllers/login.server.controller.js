const login_model = require('../models/login.server.model.js')
var mongoose = require('mongoose')
genToken = require("../config/express");

//mail = require("../controllers/mail.js"),




    exports.save = function (req, res) {

        /* Instantiate a Listing */
        var insta = new login_model({ code: 0, username: req.body.username, password:req.body.password });
        /* Then save the listing */
        insta.save(function (err) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send('{"message":"Instagram link successfully created."}');
            }
        });
        //insta_update.findOneAndUpdate({ 'code': 0 }, { 'instagramlink': req.body.instagramlink }, function (err, blog) {
        //    if (err) {
        //        res.status(400).send(err);
        //    } else {
        //        res.send('{"message":"Instagram link successfully updated."}');
        //    }
        //});
  
};
exports.login = function (req, res) {
    login_model.findOne({ 'code': 0 }, function (err, account) {
        if (err) {
            console.log(err);

            res.status(400).send(err);
        } else {
            //console.log(account.username);
            var passwordHash = require('password-hash');
            //passwordHash.verify(req.body.password, account.password)
            if (req.body.username === account.username && passwordHash.verify(req.body.password, account.password)) {
                var token = genToken.generateToken();
                res.status(200).send(token);
            }
            else {
                res.status(401).send("Incorrect username or password.");
            }

        }
    });
}
exports.passUpdate = function (req, res) {
    var hashBrowns = require('password-hash');
    var hash = hashBrowns.generate(req.body.password);

   
    login_model.findOneAndUpdate({ 'code': 0 }, { 'password': hash }, function (err, user) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send('{"message":"password successfully updated."}');
        }
    });

};





