const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require("../config.js");

// const generarJWT = ( uid = '' ) => {

//     return new Promise( ( resolve, reject ) => {

//         const payload = { uid };

//         jwt.sign( payload, process.env.SECRET_KEY,{
//             expiresIn: '24h'
//         },( err, token )=> {
//             if( err ){
//                 console.log(err);
//                 reject('No se pudo generar el token');
//             } else {
//                 resolve(token)
//             }
//         } )

//     } )

// }

const generarJWT = async(payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
}

module.exports = { generarJWT }