const { default: mongoose, model } = require("mongoose");

mongoose.connect('mongodb+srv://ckottary18:4ajza709nmavk4wr@cluster0.fdjdxav.mongodb.net/Paytm');


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    }, balance: {
        type: Number,
        required: true
    }
});


const User  = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema );

module.exports = {
    User,
    Account
}