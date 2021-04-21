import {schema} from "./graphql/schemas";
import {ApolloServer} from 'apollo-server-express'
import {createConnection, getManager} from "typeorm";
import express from "express";
import "reflect-metadata";
import UserEntity from "./entities/User.entity";
import bcrypt from "bcrypt";

(async () => {
    try {
        const connection = await createConnection();
        await connection.runMigrations();

        /** CREATE TEST USER **/

        const email = 'admin@gmail.com'
        const password = bcrypt.hashSync('1234', 10)

        const user = await getManager().findOne(UserEntity, {email})

        if (!user) {
            await UserEntity.create({email, password}).save()
        }
    } catch (error) {
        console.log('Error while connecting to the database', error);
        return error;
    }

    const server = new ApolloServer({schema, context: ({req, res}) => ({req, res})})
    const app = express()
    server.applyMiddleware({app})
    app.listen(3000, () => console.log("The server started on port " + 3000))
})();

