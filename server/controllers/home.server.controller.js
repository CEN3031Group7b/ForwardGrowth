const home = require('../models/home.server.model.js')
var mongoose = require('mongoose')




exports.update = function (req, res) {//find home model with code: 0 then update

    home.findOneAndUpdate({ 'code': 0 }, { 'company': req.body.company, 
    'payment': req.body.payment, 'about': req.body.about,'applink': req.body.applink}, function (err, homeInfo) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send('{"message":"Home page successfully updated."}');
        }
    });

};
exports.get = function (req, res) {//return Home information
    home.findOne({ 'code': 0 }, function (err, homeInfo) {
        if (err) {
            console.log(err);

            res.status(400).send(err);
        } else {
            res.send(homeInfo);

        }
    });
}



