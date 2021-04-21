import {makeExecutableSchema} from 'graphql-tools';
import {GraphQLSchema} from 'graphql';

import product from './Product'
import auth from './Auth'
import {authenticate} from '../directives/Auth';

const typeDefs = `

  directive @authenticate on FIELD_DEFINITION | FIELD
  
  ${auth.typeDefs.types}
  ${product.typeDefs.types}

  type Query {
    ${auth.typeDefs.queries}
    ${product.typeDefs.queries}
 }

  type Mutation {
    ${auth.typeDefs.mutations}
    ${product.typeDefs.mutations}
 }
`

const resolvers = {
    Query: {
        ...auth.resolvers.queries,
        ...product.resolvers.queries
    },
    Mutation: {
        ...auth.resolvers.mutations,
        ...product.resolvers.mutations
    }
}


const directiveResolvers = {
    authenticate,
};


export const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    directiveResolvers,
});
