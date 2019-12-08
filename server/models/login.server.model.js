var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var loginSchema = new Schema({ //Schema for login credentials
    code: Number,
    username: String,
    password: String,
    created_at: Date,
    updated_at: Date
});

loginSchema.pre('save', function (next) { //Throws error if no username or password given
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
