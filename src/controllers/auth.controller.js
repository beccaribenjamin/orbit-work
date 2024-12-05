const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { TOKEN_SECRET } = require("../config.js");
const { generarJWT } = require('../helpers/generarJWT');


const login = async (req, res) => {
    
    
    try {
        const { email, password } = req.body;
        const userFound  = await User.findOne({email});

        //Validar si user existe
        if( !userFound ) return res.status(400).json({msg: 'El usuario no existe'});

        //Verificar Contraseña
        const validatePassword = bcryptjs.compare(password, userFound.password);
        if(!validatePassword) return res.status(400).json({msg: 'El usuario o contraseña no son correctos'})

        
        // Genera un token
        const token = await generarJWT({
            id: userFound._id,
            role: userFound.role,
            username: userFound.username
        })

        res.cookie("token", token, {
            secure: true,
            sameSite: "none",
        });

        res.status(200).json({ 
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const verifyToken = async (req, res) => {
    const {token} = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);

        const userFound = await User.findById(user.id);
        if (!userFound) return res.sendStatus(401);

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role,
        });
    });
};

const logout = async( req, res ) => {

    res.cookie("token", "", {
        expires: new Date(0),
    });
    
    return res.sendStatus(200);

}

module.exports = { login, logout, verifyToken };
