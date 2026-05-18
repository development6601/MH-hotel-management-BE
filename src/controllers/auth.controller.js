import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {

    const { name, email, password, role } = req.body;

    const isAlreayExist = await userModel.findOne({ email });

    if (isAlreayExist) {
        res.status(400).json({
            message: "User alreay exist with this email and password"
        })
    }

    const user = await userModel.create({
        name,
        email,
        password,
        role
    });

    const token = jwt.sign({
        id: user._id,
        email: user.email,
    }, process.env.JWT_SECERT, { expiresIn: '1d' });

    res.cookie('JWT_TKOEN', token);

    res.status(400).json({
        message: "User Register Successfully",
        user
    });
}

export async function loginUser(req, res) {
    const { email, password, role } = req.body;

    const user = await userModel.findOne({ 
        email: email,
        role: role
    });

    if (!user) {
        res.status(404).json({
            message: "User Not Found With Email Or Role"
        })
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECERT, { expiresIn: "1d" });

    res.cookie("JWT_TOKEN", token);

    res.status(201).json({
        message: "User Login Successfully"
    });
}

export async function logoutUser(req, res) {
    res.clearCookie("JWT_TOKEN");

    res.status(201).json({
        message: "User Logout Successfully "
    });
} 