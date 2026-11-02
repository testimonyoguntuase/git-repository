import express from "express"
import user from "../models/userModel.js"
import bcrypt from "bcrypt"


export const createAllUsers = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password)
        const newUser = new user({
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