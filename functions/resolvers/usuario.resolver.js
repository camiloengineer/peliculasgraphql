const admin = require("firebase-admin");

const resolvers = {
    Query: {
        usuarios: async() => {
            return admin
                .database()
                .ref("usuarios")
                .once("value")
                .then((snap) => snap.val())
                .then((val) => Object.keys(val).map((key) => val[key]));
        },
        usuario: async(parent, args) => {
            let usuario = admin
                .database()
                .ref("usuarios")
                .once("value")
                .then((snap) => snap.val())
                .then((val) => Object.keys(val).map((key) => {
                    if (val[key].email && val[key].email === args.email) {
                        return val[key]
                    }
                }));

            var resp = (await usuario).filter(item => item);
            return resp[0];
        }
    },
    Mutation: {
        createUser: async(parent, args) => {

            var usuario = {
                nombre: args.nombre,
                email: args.email,
                fechaNacimiento: args.fechaNacimiento,
                sexo: args.sexo
            }

            await admin
                .database()
                .ref("usuarios")
                .push(usuario);

            return usuario;
        }
    }
};

module.exports = resolvers

// (val[key].email === args.email)