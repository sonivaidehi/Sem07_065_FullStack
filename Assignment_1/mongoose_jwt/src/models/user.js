var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
const validator = require('validator')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        uppercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is Invalid!")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password can not contains word Password')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error("Age can't be less than 0")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.methods.generateAuthToken = async function() {
    const user = this
    // sign to generate token and verify to check token
    const token = jwt.sign({ _id: user._id.toString() }, 'vaidehisoni')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

const User = mongoose.model('User', UserSchema)

module.exports = User