export default {
    typeDefs: {
        types: `
            type Product {
                name: String            
            }
        `,

        queries: `
            getProduct(id: Int): String
        `,

        mutations: `
            createProduct: String
        `,
    },

    resolvers: {
        queries: {
            getProduct() {
                return 'get product'
            }
        },

        mutations: {
            createProduct() {
                return 'create product'
            }
        },
    }
};
