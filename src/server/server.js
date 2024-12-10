const express = require('express');
const cors = require('cors')
const { dbConnection } = require('../database/config.js');
const cookieParser = require('cookie-parser');

class Server {
    constructor(){

        this.app = express();
        this.port = process.env.PORT || 4000;

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            companies: '/api/companies',
            licences: '/api/licenses'
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
    }

    middlewares() {
        this.app.use(cors({
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        }));
        this.app.use(express.json());
        this.app.use(cookieParser())
        
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.users, require('../routes/users.routes.js'));
        this.app.use(this.paths.companies, require('../routes/companies.routes'));
        this.app.use(this.paths.licences, require('../routes/lincenses.routes.js'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}


module.exports = Server;
