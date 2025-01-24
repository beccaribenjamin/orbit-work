const express = require('express');
const cors = require('cors')
const { dbConnection } = require('../database/config.js');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const path = require('path');
const { uploadRoute } = require('../middlewares/upload'); // Importar el middleware

class Server {
    constructor(){

        this.app = express();
        this.port = process.env.PORT || 4000;

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            companies: '/api/companies',
            licences: '/api/licenses',
            //Nueva ruta para subir archivos
            upload:'/api/upload'

        };

        //Conectarme a DB 
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();

    }

    async conectarDB() {
        await dbConnection();

         // Inicializa GridFS después de la conexión
        this.gfs = Grid(mongoose.connection.db, mongoose.mongo);
        
        // Asegúrate de que la colección 'uploads' esté configurada
        this.gfs.collection('uploads');  // Especifica la colección donde se almacenarán los archivos
        
        console.log('Conectado a GridFS y la colección "uploads" está lista');
    }


    middlewares() {
        this.app.use(cors({
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        }));
        this.app.use(express.json());  // Procesa los datos JSON
        this.app.use(express.urlencoded({ extended: true }));  // Procesa los datos del formulario
        this.app.use(cookieParser());  // Middleware de cookies
    }
    



    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.users, require('../routes/users.routes.js'));
        this.app.use(this.paths.companies, require('../routes/companies.routes'));
        this.app.use(this.paths.licences, require('../routes/lincenses.routes.js'));
        
        // Ruta para manejar la subida de archivos
        this.app.use(this.paths.upload, require('../routes/upload.routes')); // Nueva ruta de subida
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}



module.exports = Server;
