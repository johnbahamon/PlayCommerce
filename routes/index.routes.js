const express = require('express');

const app = express();

app.use(require('./marca.routes'));
app.use(require('./categoria.routes'));
app.use(require('./producto.routes'));
app.use(require('./proveedor.routes'));
app.use(require('./compra.routes'));
app.use(require('./usuario.routes'));
app.use(require('./venta.routes'));
app.use(require('./pos.routes'));
app.use(require('./ordenespos.routes'));

module.exports = app;