var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//This Schema stores Blog information


var blogSchema = new Schema({ //Schema for instagram link on blog page
    code: Number,
    instagramlink: String,
    created_at: Date,
    updated_at: Date
});

blogSchema.pre('save', function (next) { //Requires a link to exist in the listing
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
