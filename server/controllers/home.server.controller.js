const home = require('../models/home.server.model.js')
var mongoose = require('mongoose')




exports.update = function (req, res) {

    /* Instantiate a Listing */
    //var insta = new home({ code: 0,  company: req.body.company, payment: req.body.payment, about: req.body.about });
    ///* Then save the listing */
    //insta.save(function (err) {
    //    if (err) {
    //        res.status(400).send(err);
    //    } else {
    //        res.send('{"message":"Instagram link successfully created."}');
    //    }
    //});
    home.findOneAndUpdate({ 'code': 0 }, { 'company': req.body.company, 'payment': req.body.payment, 'about': req.body.about }, function (err, homeInfo) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send('{"message":"Instagram link successfully updated."}');
        }
    });

};
exports.get = function (req, res) {
    home.findOne({ 'code': 0 }, function (err, homeInfo) {
        if (err) {
            console.log(err);

            res.status(400).send(err);
        } else {
            res.send(homeInfo);

        }
    });
}



