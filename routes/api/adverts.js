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

module.exports= router;