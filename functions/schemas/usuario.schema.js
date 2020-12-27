const typeDefs = `
  type Usuario {
    nombre: String
    email: String
    fechaNacimiento: String
    sexo: String
  }

  type Query {
    usuarios: [Usuario]
    usuario(email: String!): Usuario
  }
  
  type Mutation{
    createUser(
        nombre: String!
        email: String!
        fechaNacimiento: String!
        sexo: String!): Usuario
  }
`;

module.exports = typeDefs