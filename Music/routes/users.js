const express = require('express');
const router = express.Router();
const User = require('../models/User')

// Get all the users
router.get('/list', async (req, res) => {
    try{
        const all_users = await User.find();
        res.json(all_users);
    }catch(err){
        res.json({message: err});
    }
});

// Create a user
router.post('/create', async (req, res) => {
    const user = new User({
        username: req.body.username,
        passwordHash: req.body.passwordHash,
        googleId: req.body.googleId,
        googleProfile: req.body.googleProfile,
        googleAccessToken: req.body.googleAccessToken
    });

    try{
        const savedUser = await user.save();
        res.json(savedUser);
    }catch(err){
        res.json({message: err});
    }

});

// Query a user
router.get('/:userId', async (req, res) => {
    try{
        const one_user = await User.findById(req.params.userId);
        res.json(one_user);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;