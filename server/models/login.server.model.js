var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var loginSchema = new Schema({
    code: Number,
    username: String,
    password: String,
    created_at: Date,
    updated_at: Date
});

loginSchema.pre('save', function (next) {
    if (this.username == null)
        throw err;
    if (this.password == null)
        throw err;
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

var login = mongoose.model('login', loginSchema);
module.exports = login;
