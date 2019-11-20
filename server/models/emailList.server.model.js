var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var emailListingSchema = new Schema({
    name: String,
    email: String,
    created_at: Date,
    updated_at: Date
});

emailListingSchema.pre('save', function (next) {
    if (this.name == null)
        throw err;
    if (this.email == null)
        throw err;
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

var emailList = mongoose.model('emailList', emailListingSchema);
module.exports = emailList;
