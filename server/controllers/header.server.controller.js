const Header = require('../models/header.server.model.js')
var mongoose = require('mongoose')
var fs = require('fs');




exports.add = function (req, res) {

    var header = new Header();
    header.img.data = Buffer.from(fs.readFileSync(req.file.path), { encoding: 'base64' });
    header.img.contentType = 'image/png';
    
    header.save(function (err) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send('{"message":"Successfully added a header image."}');
        }
    });


};

exports.update = function (req, res) {

    Header.findOneAndUpdate({ 'code': 0 }, { 'img.data': Buffer.from(fs.readFileSync(req.file.path), { encoding: 'base64' }), 
    'img.contentType': 'image/hi'}, function (err, header) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send('{"message":"Header successfully updated."}');
        }
    });

};


exports.get = function (req, res) {
    Header.find({}, function (err, header) {
        if (err) {
            console.log(err);

            res.status(400).send(err);
        } else {
            console.log(header);
            res.send(header);

        }
    });
}





