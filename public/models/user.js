var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    }
});


UserSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password') == false) {
        return next();
    }

    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            console.log(err);
        }
        console.log('Hashed Password: ', hash);
        user.password = hash;
        return next();
    });
})

UserSchema.methods.comparePassword = function(candidatePassword, callback) {

    var user = this;

    bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
            if (err) {
                console.log(err);
            } else {
                console.log('isMatch ', isMatch);
                callback(null, isMatch);
            }
        })
        // callback(null, this.password == candidatePassword);
};


module.exports = mongoose.model('User', UserSchema)
