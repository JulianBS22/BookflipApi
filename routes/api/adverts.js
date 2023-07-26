const express = require ('express');
const router = express.Router();
const Advert = require ('../../models/adverts')

//GET api/adverts
router.get('/',async ( req, res, next)=>{
    try {
        const adverts = await Advert.find();

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


//PATCH /api/adverts

module.exports= router;