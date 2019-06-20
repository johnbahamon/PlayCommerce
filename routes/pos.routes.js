const express = require('express');

let app = express();

let Pos = require('../models/pos.model');

const NUMERACION_PREFIJO = 'PRUE';
const NUMERACION_DESDE = 98000000;
const NUMERACION_HASTA = 99000000;


app.get('/pos', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Pos
        .find()
        .populate('clienteId', 'nombre')
        .sort({ nombre: 1 })
        .skip(desde)
        .limit(8)
        .exec((err, ventas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Pos.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    ventas,
                    total: conteo
                });
            })

        })
});

app.get('/pos-lista-completa', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Pos
        .find()
        .sort({ nombre: 1 })
        .exec((err, ventas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                ventas
            });


        })
});

app.post('/pos', (req, res) => {

    console.log('POS');


    const venta = new Pos(req.body);

    Pos.countDocuments({}, (err, count) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: 'No se pueden contar los registros'
            })
        }

        let numeroDeFactura = NUMERACION_DESDE + count + 1;

        if (numeroDeFactura > NUMERACION_HASTA) {
            console.log('ENTRO AL IF');

            return res.status(500).json({
                ok: false,
                err: 'No se puede generar mas facturas con esta numeración'
            })
        }

        venta.numeroDeFactura = NUMERACION_PREFIJO + numeroDeFactura;
        console.log(venta);

        venta.save((err, ventaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.status(201).json({
                ok: true,
                venta: ventaDB
            });
        })
    })

});

app.get('/pos/:id', (req, res) => {
    Pos
        .findById(req.params.id)
        .populate('clienteId', 'nombre')
        .populate('productos.productoId')
        .exec((err, venta) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                venta,
            })
        })
});



module.exports = app;