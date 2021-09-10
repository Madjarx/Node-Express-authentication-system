const string = require('joi/lib/types/string');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// pravim semu
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: true,

    }
});

userSchema.pre('save', async function(next) {
    try{
        // generate salt
        const salt = await bcrypt.genSalt(10);

        // hash password
        const passwordHash = await bcrypt.hash(this.password, salt);

        //menjam plain sifru sa hash-om
        this.password = passwordHash;

        next();
    }catch(error){
        next(error)
    }
});

userSchema.methods.isValidPassword = async function (newPassword) {
    try{
        return await bcrypt.compare(newPassword, this.password);
    }catch(error){
        throw new Error (error);
        //nemam next tkd moram da 
    }
}

// pravinm model
const User = mongoose.model('user', userSchema)

//exportujem model
module.exports = User;