var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var usuarioSchema = new Schema({
    razonSocial: { type: String },
    nombreComercial: { type: String },
    primerNombre: { type: String },
    segundoNombre: { type: String },
    apellidos: { type: String },
    tipoId: { type: String, required: [true, 'El tipo de Id es necesario'] },
    numeroId: { type: String, required: [true, 'El número de Id es necesario'], unique: true },
    ciudad: { type: String, required: [true, 'La ciudad es necesaria'] },
    departamento: { type: String, required: [true, 'El departamento es necesario'] },
    direccion: { type: String, required: [true, 'La dirección es necesaria'] },
    telefono: { type: String, required: [true, 'El teléfono es necesario'] },
    email: { type: String },
    tipo: {
        type: String,
        enum: [
            'administrador',
            'tecnico',
            'cliente',
            'vendedor',
            'proveedor'
        ]
    }
});


module.exports = mongoose.model('Usuario', usuarioSchema);