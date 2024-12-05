const {Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        
    },
    position: {
        type: String,
        require: true,
    },
    area: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'employee'],
        default: 'employee'
    },
    company: {
        type: Schema.Types.ObjectId, 
        ref: 'Company', 
        required:true,
    },

},  
    {
        timestamps: true,
    }
)

module.exports = model('User', userSchema)