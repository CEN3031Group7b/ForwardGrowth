var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var headerSchema = new Schema({
    img:
        {data:Buffer, contentType:String},
    created_at: Date,
    updated_at: Date
});

headerSchema.pre('save', function (next) {

    if (this.img == null)
        throw err;
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

var header = mongoose.model('header', headerSchema);
module.exports = header;
