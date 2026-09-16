
import prisma from "../lib/prisma.js";
import apiError from "../utils/ApiError.js";
import bycrypt from "bcryptjs";
import env from "../config/env.js";

import jwt from "jsonwebtoken";

export const register = async ({name,email,password}) => {
    const alreadyRegistered = await prisma.user.findUnique({
        where: {
            email,
        }
    });

    if(alreadyRegistered){
        throw new apiError(409,"Email is already registerd");
    }

    const passwordHash = await bycrypt.hash(password,12);


    const user = await prisma.user.create({
        data: {
            name,email,passwordHash,
        }
    })

    const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
    };

    return safeUser;
};


export const login = async ({email,password}) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        }
    });

    if(!user){
        throw new apiError(401,"user not found");
    };

    const isPasswordValid = await bycrypt.compare(password,user.passwordHash);

    if(!isPasswordValid){
        throw new apiError(401, "Invalid email or password");
    };


    const token = jwt.sign(
        {
            userId: user.id,
            role: user.role
        },
        env.JWT_SECRET,
        {
                expiresIn: "7d",
                algorithm: "HS256",
        }
    )


    const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,       
    }

    return{
        token,
        user: safeUser,
    }

}