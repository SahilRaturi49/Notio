import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId){
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken()
}