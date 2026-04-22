import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Car from "../models/Car.js";


// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
}

// register user
export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.json({success: false, message: 'fill all the fields'})
        }

        if(password.length < 8){
            return res.json({success: false, message: "Password must be at least 8 characters"})
        }

        const userExists = await User.findOne({email: email.toLowerCase()})
        if(userExists){
            return res.json({success: false, message: 'user already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword
        })

        const token = generateToken(user._id.toString());
        res.json({success:true, token})


    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Login User

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email.toLowerCase()})
        if(!user){
            return res.json({success: false, message: "user not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success:false, message:"Invalid Credential"})
        }
        const token = generateToken(user._id.toString())
        res.json({success:true,token})
    } catch (error) {    
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}


// Get user data using token (JWT)
export const getUserData = async(req, res) => {
    try {
        const {user} = req;
        res.json({success: true, user})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Get All Cars for the frontend
export const getCars = async(req, res) => {
    try {
        const cars = await Car.find({isAvailable: true})
        res.json({success: true, cars})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}