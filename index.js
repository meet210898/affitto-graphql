import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import typeDefs from './schemaGql.js';
import { JWT_SECRET, MONGO_URI } from './config.js';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

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

server.listen().then(({ url }) => {
    console.log(`server ready at ${url}`);
});