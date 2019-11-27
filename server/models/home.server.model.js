var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var homeSchema = new Schema({
    code: Number,
    company: String,
    payment: String,
    about: String,
    applink: String,
    created_at: Date,
    updated_at: Date
});

homeSchema.pre('save', function (next) {
    
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

var home = mongoose.model('home', homeSchema);
module.exports = home;
