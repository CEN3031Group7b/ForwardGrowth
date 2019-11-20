var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var blogSchema = new Schema({
    code: Number,
    instagramlink: String,
    created_at: Date,
    updated_at: Date
});

blogSchema.pre('save', function (next) {
    if (this.instagramlink == null)
        throw err;
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

var blog = mongoose.model('blog', blogSchema);
module.exports = blog;
