const tile = require('../models/tile.server.model.js')
var mongoose = require('mongoose')
var fs = require('fs');

exports.add = function (req, res) {
    //Create new tile schema with inputted info
    var _tile = new tile({ name: req.body.name, position: req.body.position });
    _tile.img.data = Buffer.from(fs.readFileSync(req.file.path), 'base64');

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
    //deletes a tile based on id
    tile.deleteOne({ _id: req.body._id }, function (err, tileDeleted) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send('{"message":"Successfully deleted '.concat(req.body.name, '\'s card"}'));
        }
    });

};

exports.get = function (req, res) {
    //returns all of the tiles form the database
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
    //updates a tile
    var original = String(req.body.originalname);
    tile.findOne({ _id: req.body._id }, function (err, _tile) {
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