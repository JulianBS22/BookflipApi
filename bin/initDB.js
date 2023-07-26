'use strict';

const Advert = require('../models/adverts')
const connection = require ('../lib/conectmongoose')
main().catch(err => console.log ('Hubo un error', err));

async function main () {
    
    // inicializamos colección de agentes
    await initAdverts();
    connection.close();
}

async function initAdverts(){
    // borrar todos los documentos de la colección de adverts
    const deleted = await Advert.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount}, anuncios`);
    // crear adverts iniciales
    const inserted = await Advert.insertMany([
        {nombre: 'Cancion de Hielo y Fuego', autor: 'George R.R. Martin', estado:'nuevo', precio:30, ubicación:'Albacete', contacto: 'contacto5@bookflip.com', addId:5},
        {nombre: 'Spiderman', autor: 'Stan Lee', estado:'nuevo', precio:15, ubicación:'Avila', contacto: 'contacto6@bookflip.com', addId:6}
    ]);
    console.log(`Creados ${inserted.length} anuncios`);
};