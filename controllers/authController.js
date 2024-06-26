const { hashedPassword, comparePassword } = require('../helpers/auth');
const User = require('../models/user')
const  jwt = require('jsonwebtoken')
const test = (req,res) =>{
    res.json('test is working')
}

// Register End Point

const registerUser = async(req,res)=>{
    console.log("registering")
    try {
        const {name, email, password} = req.body;
        if(!name){
            return res.json({
                error : 'name is required'
            })   
        }
        // check password is good
        if(!password || password.length <6){
            return res.json({
                error: 'Password is requires and should be at least 6 character'
            })
        }
        // check email
        const exists = await User.findOne({email})
        if(exists){
            return res.json({
                error: 'Email is already taken'
            })
        }

        const hashed = await hashedPassword(password);
        const user = await User.create({
            name, email, password: hashed
        })
        return res.json(user);
    } catch (error) {
        console.log(error);
    }

}

const loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        // console.log(user.email)
        if(!user){
            return res.json({
                error: "No user found"
            })
        }

        const match = await comparePassword(password, user.password)
        if(match){
            jwt.sign({email:user.email, id:user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token)=>{
                if(err) throw err;
                    res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite:'none',
                    maxAge: 604800000, // Expires in 7 days (604800000 milliseconds)
                }).json(user);
            })
        }
        if(!match){
            res.json({
                error: "Password do not match ",
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const getProfile = (req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user)=>{
            if(err) throw err
            res.json(user)   
        })
    }else{
        res.json("No user found");
    }
}
const logoutUser = (req,res)=>{
    try{
          // Clear the 'token' cookie
        res.clearCookie('token', {
        httpOnly: true, // Set to true for HTTP-only cookies
        secure: true, // Set to true for HTTPS
        sameSite: 'none', // Set the appropriate SameSite value
        path: '/' // Set the path for which the cookie should be cleared
      });

        res.header('Access-Control-Allow-Origin', 'https://subhodeep014.github.io');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        res.status(200).json({ message: "Successfully logged out" });

    }catch(error){
        res.json({
            error: "Error while signing out!"
        })
    }

    
}
module.exports = {
    test, registerUser, loginUser, getProfile, logoutUser
}
