const tile = require('../models/tile.server.model.js')
var mongoose = require('mongoose')
//mail = require("../controllers/mail.js"),
var fs = require('fs');

exports.add = function (req, res) {
    console.log(req); //Does not print
    var _tile = new tile({ name: req.body.name, position: req.body.position });
    //console.log(req.body.photo);
    _tile.img.data = Buffer.from(fs.readFileSync(req.file.path), 'base64');
    console.log(_tile.img.data)

    _tile.img.contentType = 'image/png';
    /* Then save the listing */
    _tile.save(function (err) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send('{"message":"Successfully added a team member."}');
        }
    });


};
exports.delete = function (req, res) {
    tile.deleteOne({ name: req.body.name }, function (err, tileDeleted) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send('{"message":"Successfully deleted '.concat(req.body.name, '\'s card"}'));
        }
    });

};

exports.get = function (req, res) {
    tile.find({}, function (err, listyBoi) {
        if (err) {
            console.log(err);

            res.status(400).send(err);
        } else {
            //console.log(listyBoi);
            res.status(200).send(listyBoi);
        }
    });
};


exports.update = function (req, res) {
    var original = String(req.body.originalname);
    tile.findOne({ name: original }, function (err, _tile) {
        if (err) {
            res.status(400).send(json("err"));
        }
        
        console.log(req);
        if (req.body.name != "" && req.body.name) _tile.name = req.body.name;
        if (req.body.position != "" && req.body.position) _tile.position = req.body.position;
        if (req.file) {
            //Checking if photo had been uploaded
            _tile.img.data = Buffer.from(fs.readFileSync(req.file.path), { encoding: 'base64' });
            _tile.img.contentType = 'image/png';
        }

        _tile.save(function (err) {
            if (err)
                res.json(err);
            // res.json(_tile);
        });
        res.status(200).send('{"message":"Team member has been updated"}');
    });
};