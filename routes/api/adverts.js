const express = require ('express');
const router = express.Router();
const Advert = require ('../../models/adverts')

//GET api/adverts
//devuelve lista de anuncios
router.get('/',async ( req, res, next)=>{
    try {
        
        //filtros
        const filterByName = req.query.nombre;
        const filterByPrice = req.query.precio;

        const filtro = {};
        //paginación
        const skip = req.query.skip;
        const limit =req.query.limit;

        //ordenación
        const sort = req.query.sort;
        //selección de campos
        const fields = req.query.fields

        if (filterByName) { filtro.name = filterByName};
        if (filterByPrice) {filtro.precio = filterByPrice}

        const adverts = await Advert.lista( filtro, skip, limit, sort, fields );

        res.json ({ results: adverts});

    } catch (error) {
        next(error);
    }
});

// GET /api/adverts/(_id)
//Devuelve un adverts buscado por  _id
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const advert = await Advert.findById(id);

        res.json({ result: advert })
    } catch (error) {
        next(error);
    }
})


//PUT /api/adverts/(id)   (body)
//actualizar anuncio
router.put('/:id', async (req, res, next) =>{
    try {
        
        const id = req.params.id
        const data = req.body;
        const advertChanged = await Advert.findByIdAndUpdate(id, data, {new:true});

        res.json({ result:advertChanged });

    } catch (error) {
        next(error);
    }
})


//POST /api/adverts   (body)
//añadir adverts
router.post ('/', async (req, res, next) =>{
    try {
        const advertData = req.body;

        //creamos una instancia de adverts
        const advert = new Advert(advertData);
        //la persistimos en la BD
        const advertSaved = await advert.save();
        res.json ({ result: advertSaved })

    } catch (error) {
        next(error)
    }
});

//Delete /api/adverts/:(id)
// Elimina un anuncio
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        await Advert.deleteOne({ _id: id })

        res.json();

    } catch (error) {
        next(error);
    }
})

module.exports= router;