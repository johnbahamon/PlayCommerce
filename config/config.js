// Lógica para trabajar con dos Bases de datos según el entorno
let urlDB;

if (process.env.NODE_ENV === 'development') {
    console.log('Estamos en modo desarrollo');

    urlDB = process.env.MONGO_URI_LOCAL;
    
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;