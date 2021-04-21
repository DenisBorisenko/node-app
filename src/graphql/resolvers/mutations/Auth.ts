import {ApolloError} from "apollo-server-express";
import jwt, {Secret} from 'jsonwebtoken'
import {getManager} from "typeorm";
import bcrypt from 'bcrypt'
import User from "../../../entities/User.entity";

export async function login({password, email}: any, context: any): Promise<ApolloError | String> {
    const user = await getManager().findOne(User, {
        email: email
    })

    if (user && !await bcrypt.compare(password, user.password)) {
        throw new ApolloError('Invalid credentials')
    }

    const token = jwt.sign({user}, process.env.JWT_SECRET as Secret)

    context.user = {
        token,
        user
    }

    return token
}