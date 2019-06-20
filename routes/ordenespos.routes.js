const express = require('express');

let app = express();

let OrdenPos = require('../models/ordenespos.model');

app.get('/ordenes-pos', (req, res) => {

    OrdenPos
        .find({ etiqueta: 'CREADA' })
        .populate('clienteId')
        .exec((err, ventas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            OrdenPos.countDocuments({ etiqueta: 'CREADA' }, (err, conteo) => {
                res.json({
                    ok: true,
                    ventas,
                    total: conteo
                });
            })

        })
});

app.get('/ordenes-pos-lista-completa', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    OrdenPos
        .find({ habilitado: true })
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

app.post('/ordenes-pos', (req, res) => {

    console.log('POS');


    const venta = new OrdenPos(req.body);


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

});

app.get('/ordenes-pos/:id', (req, res) => {
    OrdenPos
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

app.delete('/ordenes-pos/:id', (req, res) => {
    OrdenPos
        .findByIdAndDelete(req.params.id)
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

app.put('/ordenes-pos/:id', (req, res) => {
    OrdenPos
        .findByIdAndUpdate(req.params.id, req.body)
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

app.put('/ordenes-pos-deshabilitar/:id', (req, res) => {
    OrdenPos
        .findByIdAndUpdate(req.params.id, { habilitado: false })
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