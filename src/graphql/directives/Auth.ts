import {ApolloError} from "apollo-server-express";
import jwt, {Secret} from 'jsonwebtoken'
import UserEntity from "../../entities/User.entity";

export async function authenticate(resolve: any, parent: any, directiveArgs: any, context: any, info: any) {

    const {
        user,
        req: {
            headers: {
                authorization,
                Authorization
            }
        }
    } = context

    if (!user) {
        let token = authorization || Authorization

        if (!token) {
            throw new ApolloError('Not authenticated');
        }

        token = token.substring(7);

        context.user = await jwt.verify(token, process.env.JWT_SECRET as Secret, async (err: any, {user: {email}}: any) => {
            return await UserEntity.findOne({email});
        });
    }

    return await resolve();
}
