const Header = require('../models/header.server.model.js')
var mongoose = require('mongoose')
var fs = require('fs');




exports.add = function (req, res) {//adds a new header img to the database
    console.log("Header req" + req); //Does not print
    var header = new Header();
    header.img.data = Buffer.from(fs.readFileSync(req.file.path), { encoding: 'base64' });
    header.img.contentType = 'image/png';
    header.code = 0;

    header.save(function (err) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send('{"message":"Successfully added a header image."}');
        }
    });


};

exports.get = function (req, res) {//gets last header image added
    // // if (Header.find({}) = null) res.status(400);
    // var header = Header.find({}).sort({_id:-1}).limit(1); 
    // console.log(header);
    // res.send(header);
    Header.find({}, function (err, header) {
        if (err) {
            console.log(err);

            res.status(400).send(err);
        } else {
            res.send(header[Number(header.length) - 1]);
        }
    });
};





