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
                res.send('{"message":"Password created."}');
            }
        });
       
  
};
exports.login = function (req, res) {
    login_model.findOne({ 'code': 0 }, function (err, account) { //Find and validate password
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
                res.status(401).send("incorrect");
            }

        }
    });
}
exports.passUpdate = function (req, res) {//Hash password and update
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





