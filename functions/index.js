const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const environment = require('./environments/environment');
const typeDefs = require('./schemas/usuario.schema');
const resolvers = require('./resolvers/usuario.resolver');

const serviceAccount = require(environment.serviceAccount)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: environment.databaseURL
});

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/", cors: true });
exports.graphql = functions.https.onRequest(app);