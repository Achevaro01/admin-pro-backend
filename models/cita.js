const { Schema, model } = require('mongoose');

const CitaSchema = Schema({

    motivoCita: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true,
        index: true
    },
    hora: {
        type: String,
        required: true,
        index: true
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'citas' });

CitaSchema.method('toJSON', function() {
    const {__v, ...Object} = this.toObject();
 
     Object.uid = this._id;
    return Object;
 })
 
 module.exports = model ('Cita', CitaSchema);