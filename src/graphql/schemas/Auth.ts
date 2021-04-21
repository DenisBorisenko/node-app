import {login} from "../resolvers/mutations/Auth";

export default {
    typeDefs: {
        types: `
        
          type User {
            id: Int
            email: String
          }
          
          input LoginInput {
            email: String!
            password: String!
          }
    `,

        queries: `
          user: User @authenticate
    `,

        mutations: `
          login(data: LoginInput!): String
        `,
    },

    resolvers: {
        queries: {
            user: async (_: any, args: any, {user}: any) => {
                return user;
            },
        },
        mutations: {
            login: async (_: any, {data}: any, context: any) => {
                return await login(data, context);
            },
        },
    }
}
