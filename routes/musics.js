const express = require('express');
const router = express.Router();
const Music = require('../models/Music')

// Get all the musics
router.get('/list', async (req, res) => {
    try{
        const all_musics = await Music.find();
        res.json(all_musics);
    }catch(err){
        res.json({message: err});
    }
});

// Query a music
router.get('/:musicId', async (req, res) => {
    try{
        const song = await Music.findById(req.params.musicId);
        res.json(song);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;