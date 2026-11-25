import express from "express"
import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
 

export const registerUser = async (req, res) => {
    try {
        // const password = "123456789"
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        // console.log(password);

        const newUser = new User({
            name : req.body.name,
            age: req.body.age,
            email: req.body.email,
            password: hashedPassword
        })
        
        const savedUser = await newUser.save()

        res.status(201).json({
            message: "user successfully created",
            data: {
                user: savedUser
            }
        })
    }
    catch(error) {
        res.status(500).json(
            {
            message: "Failed to create user",
            status: error.message
            }
        )
    }
}


export const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        
    const existingUser = await User.findOne({email})

    if (!existingUser) {
        return res.status(404).json({
            message: "invalid email"
        })
    }

    const isCorrectPassword = await bcrypt.compare(password, existingUser.password)

    if (isCorrectPassword == false) {
        return res.json({
            message: "incorrect Password"
        })
    }

    const token = jwt.sign(
        {id: existingUser._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "1d"}
    )

    

    res.status(200).json({
        message: "successful",
        data: existingUser,
        token: token
    })
    }
    catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
           return res.status(404).json({
                message: "user not found"
            })
        }

        res.status(200).json({
            message: "profile accessed",
            user
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}