const express = require('express');

let app = express();

let Marca = require('../models/marca.model');

app.get('/marcas', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Marca
        .find()
        .sort({ nombre: 1 })
        .skip(desde)
        .limit(8)
        .exec((err, marcas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Marca.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    marcas,
                    total: conteo
                });
            })

        })
});

app.get('/marcas-lista-completa', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Marca
        .find()
        .sort({ nombre: 1 })
        .exec((err, marcas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                marcas
            });


        })
});

app.get('/nombre-marcas-lista-completa', (req, res) => {

    Marca
        .find()
        .select('nombre')
        .sort({ nombre: 1 })
        .exec((err, marcas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                marcas
            });


        })
});

app.get('/marcas-lista-completa-populada', (req, res) => {


    Marca
        .find()
        .select('nombre')
        .populate({ path: 'categorias', select: 'nombre' })
        .sort({ nombre: 1 })
        .exec((err, marcas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                marcas
            });


        })
});

app.post('/marcas', (req, res) => {
    let body = req.body;

    console.log(body);

    let marca = new Marca({
        nombre: body.nombre,
        slug: body.slug,
        categorias: body.categorias,
    })

    marca.save((err, marcaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            marca: marcaDB
        });
    })
});

app.put('/marcas/:id', (req, res) => {
    console.log('PUT ', req.params.id);
    console.log('CATEGORIAS ', req.body.categorias);

    Marca.findByIdAndUpdate(req.params.id, { categorias: req.body.categorias }, (err, marcaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            marca: marcaDB
        });
    })
});


app.get('/marcas/:id', (req, res) => {

    Marca
        .findById(req.params.id, 'nombre categorias')
        .populate({
            path: 'categorias',
            select: 'nombre parent',
            populate: {
                path: 'parent',
                select: 'nombre'
            }
        })
        .exec(
            (err, marcaDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.status(201).json({
                    ok: true,
                    marca: marcaDB
                });
            }
        )

});

module.exports = app;