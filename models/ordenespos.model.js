const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrdenPosSchema = Schema({
    fechaDeOrden: { type: Date, default: Date.now },
    clienteId: { type: Schema.ObjectId, ref: 'Usuario' },
    productos: [{
        _id: false,
        nombre: { type: String },
        referencia: { type: String },
        productoId: { type: Schema.ObjectId, ref: 'Producto' },
        cantidad: { type: Number },
        valorFijo: { type: Number },
        valorVenta: { type: Number },
        valorTotal: { type: Number }
    }],
    total: { type: Number },
    subtotal: { type: Number },
    iva: { type: Number },
    metodoPago: { type: String },
    etiqueta: { type: String, required: [true, 'La etiqueta es necesaria'], enum: ['CREADA', 'RECHAZADA', 'COMPLETADA'] },
})

module.exports = mongoose.model('OrdenPos', OrdenPosSchema)