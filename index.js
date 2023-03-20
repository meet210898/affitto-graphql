import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import typeDefs from './schemaGql.js';
import { JWT_SECRET, MONGO_URI } from './config.js';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import express from 'express';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log('connected to mongodb');
});

mongoose.connection.on("error", (error) => {
    console.log('error in mongodb', error)
});

import './Models/user/RegisterUser.js';
import './Models/admin/State.js';
import './Models/admin/City.js';
import './Models/admin/VehicleType.js';
import './Models/admin/Company.js';
import './Models/admin/Vehicle.js';
import './Models/admin/Booking.js';
import './Models/admin/FaqCategory.js';
import './Models/admin/Faq.js';

import resolvers from './resolvers.js';

const context = ({ req }) => {
    const { authorization } = req.headers
    if (authorization) {
        const { userId } = jwt.verify(authorization, JWT_SECRET)
        return { userId }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

await server.start();

const app = express();

app.use(graphqlUploadExpress());
server.applyMiddleware({ app });
await new Promise((r) => app.listen({ port: 4000 }, r));
console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
// server.listen().then(({ url }) => {
//     console.log(`server ready at ${url}`);
// });