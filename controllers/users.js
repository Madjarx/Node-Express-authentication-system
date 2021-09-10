const JWT = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET} = require('../configuration')

signToken = (user) => {
    return JWT.sign({
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1) //ovo vreme + 1 dan
    }, JWT_SECRET);

}

module.exports = {
    signUp: async (req, res, next) => {
        // ---------OVAKO BI TO BILO U ES6
        // const{ email, password } = req.value.body;
        // const newUser = new User({
        //     email,
        //     password,
        // })   
        // Creating new users    
        const email = req.value.body.email; // kazem req.value.body a ne req.body jer imam joi instaliram
        const password = req.value.body.password;

        // Check if there is user with same email
        const foundUser = await User.findOne({ email: email}) //awaitujem jer treba neko vreme da se nadje, nije instant, trazim da li prvi argument tj email iz seme postoji
        if(foundUser){
            return res.status(403).json({ error: "Email is already in use"});
        }

        // Create a new user
        const newUser = new User({
            email: email,
            password: password,
        })
        await newUser.save();
   
        //res.json({user: 'created'});
        const token = signToken(newUser);

        // Respond with token
        res.status(200).json({ token : token});
    },


    signIn: async (req, res, next) => {
        // generate token

        const token = signToken(req.user);
        res.status(200).json({ token });


    },

    secret: async (req, res, next) => {
        console.log('dosao sam do ovde');
        res.json({secret: "resource"})
    }
}