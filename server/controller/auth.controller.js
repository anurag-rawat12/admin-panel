import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRY } from "../config/env.js";
import mongoose from "mongoose";

export const Signup = async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{
            name: name,
            email: email,
            password: hashedPassword,
            role: role

        }], { session });

        const token = jwt.sign(
            {
                userId: newUser[0]._id,
                role: role
            }, JWT_SECRET, {
            expiresIn: JWT_EXPIRY,
        })

        await session.commitTransaction();
        session.endSession();
        return res.status(201).json({
            message: 'User created successfully',
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            token: token
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

export const Signin = async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const hashedPassword = await bcrypt.compare(password, existingUser.password);
        if (!hashedPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }


        const token = jwt.sign(
            {
                userId: existingUser._id,
                role: existingUser.role
            }, JWT_SECRET, {
            expiresIn: JWT_EXPIRY,
        })

        await session.commitTransaction();
        session.endSession();
        return res.status(201).json({
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role
            },
            token: token
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}
