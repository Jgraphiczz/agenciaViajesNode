//configurar el servidor de express

    //Importando express //CommonJS
        //const express = require('express');

    import express from 'express'; //Para esto necesito cambair package.json y añadir "type":"module",
    import router from './routes/index.js';
    import db from './config/db.js';

    //Contiene una funcion para ejecutar express
    const app = express();

    //Conectar la base de datos
    db.authenticate()
        .then(() => console.log('Base de datos conectada'))
        .catch(error=> console.log(error));

    //Definir puerto
    const port = process.env.PORT || 4000;

    //habilitar pug
    app.set('view engine','pug');

    // obtener año actual
    app.use( (req,res, next) =>{
        const year = new Date();
        res.locals.actualYear = year.getFullYear();
        next();
    });

    //Agregar body parser para leer los datos del formulario

    app.use(express.urlencoded({extended: true}));

    //definir la carpeta publica
    app.use(express.static('public'));

    //Agregar el router
    app.use('/', router) //app.use soporta todos los verbos pasamos la direccion y decimos que agregue router

    //Funcion que tiene un callback que arranca el puerto
    app.listen(port,() => {
        console.log(`El servidor esta funcionando en el puerto ${port}`)
    })