const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PosSchema = Schema({
    fechaDeFactura: { type: Date, default: Date.now },
    clienteId: { type: Schema.ObjectId, ref: 'Usuario' },
    numeroDeFactura: { type: String },
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
    efectivo: { type: Number },
    cambio: { type: Number },
    metodoPago: { type: String }
})

module.exports = mongoose.model('Pos', PosSchema)