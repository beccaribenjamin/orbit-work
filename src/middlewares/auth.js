const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verifyToken = (req, res, next) => {
    const {token} = req.cookies;

    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la petición' });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        console.log('Payload del token:', payload);
        req.userId = payload.id;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};

const isAdmin = async( req, res, next ) => {

    try {
        const userId = req.user; // Obtenido del middleware verifyToken
        const userFound = await User.findById(userId);

        if (!userFound || userFound.role !== 'admin') {
            return res.status(403).json({ msg: 'No tienes permiso para realizar esta acción' });
        }

        next();
    } catch (error) {
        console.error('Error en isAdmin:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }

}


module.exports = {
    verifyToken,
    isAdmin,
}