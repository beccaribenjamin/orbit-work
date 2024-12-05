const  mongoose  = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN );
        console.log('Basde datos conectada')
    } catch (error) {
        console.error('Error al conectarse a la base de datos', error);
        console.log(error)
        throw new Error('Error al iniciar la base de datos');
    }

};


module.exports = {dbConnection};