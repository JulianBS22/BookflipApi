const mongoose = require ('mongoose')

//definir los esquimas de los anuncios
const advertSchema = mongoose.Schema({
    nombre: String,
    autor: String,
    estado: String,
    precio: Number,
    ubicación: String,
    contacto: String,
    addId: Number

});

//colecciones

advertSchema.statics.lista = function(filtro, skip, limit, sort, fields) {
    const query = Adverts.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(fields);
    return query.exec();
};

//Crear el modelo de los anuncios
const Adverts = mongoose.model('Adverts', advertSchema);

//exportar el modelo
module.exports = Adverts;