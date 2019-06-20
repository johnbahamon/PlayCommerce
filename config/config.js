// Variable Puerto
process.env.PORT = process.env.PORT || 3001;
// Si no existe NODE_ENV, me aseguro de convertirla en 'dev'
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// Lógica para trabajar con dos Bases de datos según el entorno
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    console.log('Estamos en modo desarrollo');

    urlDB = 'mongodb+srv://alexander:SBaRkgYxsHfVTvPD@tienda-universal-lx5cm.mongodb.net/admintienda?retryWrites=true';
    
    // urlDB = 'mongodb://192.168.1.100:27017/tienda-universal';
    // urlDB = 'mongodb://admini:abc123456789@ds121945.mlab.com:21945/tiendaonline';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;