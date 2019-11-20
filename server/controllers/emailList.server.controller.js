const EmailList = require('../models/emailList.server.model.js')
var mongoose = require('mongoose')
mail = require("../controllers/mail.js"),



exports.hello = function(req, res) {
    res.send('world')
};
exports.list = function (req, res) {
    /* Add your code */

    Listing.find({}, null, { sort: { code: 1 } }, function (err, listing) {
        if (err) {
            res.status(404).send(err);
        }
        else {
            res.json(listing);

            //console.log(listing);
        }
    });
};

exports.create = function (req, res) {

    /* Instantiate a Listing */
    var emailList = new EmailList({ name: req.body.name, email: req.body.email });
    /* Then save the listing */
    emailList.save(function (err) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send('{"message":"Email successfully added to list serve."}');
        }
    });
};

exports.listServe = function (req, res) {

    EmailList.find({}, function (err, listyBoi) {
        if (err) throw err;
        listyBoi.forEach(function (listing) {
            req.body.receiverName = listing.name;
            req.body.receiver = listing.email;
            req.body.sender = 'automatedEmailer';

            mail.request(req, res);
        })
    });
};



