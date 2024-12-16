const bcryptjs = require('bcryptjs');
const User = require("../models/user.model");
const Company = require('../models/company.model');


const createUser = async(req, res) => {
    
    try {
        
        const { name, email, password, role, position, area, company } = req.body;

        const user = new User({ name, email, password, role, position, area, company })

        // Verificar si la empresa existe
        const companyExists = await Company.findById(company);
        if (!companyExists) {
            return res.status(404).json({ msg: 'Empresa no encontrada' });
        }

        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt )

        //Guardamos empleado en la base de datos
        await user.save()

        //Actualizar el campo employees en la empresa
        companyExists.employees.push(user._id);
        await companyExists.save();

        res.status(200).json({
            msg: 'Usuario creado correctamente',
            user,
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el usuario'
        })

    }


};

const editUser = async(req, res) => {

    try {
        
        const id = req.params.id;
        const { _id, ...resto } = req.body;

        //Buscamos el usuario
        const user = await User.findByIdAndUpdate( id, resto )
        
        // console.log(user)
        // if( !user ) return res.status(404).json({msg: 'El usuario no existe'});
        res.json({
            msg: 'Usuario Actualizado',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el usuario'
        })
    }

}

const getUserById = async( req, res ) => {

    try{
        const userId = req.params.id;
        const user = await User.findById(userId)
        if(!user) { return res.status(400).json({msg: 'Usuario no encontrado'})}
        res.json(user)
    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'Error al obtener el usuario'})
    }

}

const getUsersByCompany = async(req, res) => {

    const {companyId} = req.params

    try {
        const employees = await User.find({ company: companyId })
            .select("name email area position role createdAt updatedAt");

        if( !employees ){
            return res.status(404).json({msg: 'No se encontraron empleados'})
        }
        res.json(employees);
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }

}

const deleteUser = async(req, res) => {

    try{
        // Buscar y eliminar el usuario
        const userToDelete = await User.findByIdAndDelete(req.params.id);
        if (!userToDelete) {
            return res.status(404).json({ msg: 'Usuario no encontrado o el usuario no existe' });
        }

        // Si el usuario pertenece a una compañía, eliminarlo del array de empleados
        if (userToDelete.company) {
            const company = await Company.findById(userToDelete.company);
            if (company) {
                company.employees = company.employees.filter(
                    (employeeId) => employeeId.toString() !== req.params.id
                );
                await company.save();
            }
        }

        return res.status(204).json({ msg: 'Usuario eliminado correctamente' });
    }catch( error ){
        return res.status(500).json({msg: error.message})
    }

}

module.exports = { 
    createUser,
    editUser,
    getUserById,
    getUsersByCompany,
    deleteUser,
};