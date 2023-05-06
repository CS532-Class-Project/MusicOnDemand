const express = require('express');
const router = express.Router();
const Res = require('../models/externalResources')

// Get all
router.get('/list', async (req, res) => {
    try{
        const all = await Res.find();
        res.json(all);
    }catch(err){
        res.json({message: err});
    }
});

// create
router.post('/create', async (req, res) => {
    const entry = new Res({
        name: req.body.name,
        area: req.body.area,
        author: req.body.author,
        style: req.body.style,
        year: req.body.year,
        link: req.body.link,
        img_href: req.body.img_href
    });

    try{
        const savedEntry = await entry.save();
        res.json(savedEntry);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;