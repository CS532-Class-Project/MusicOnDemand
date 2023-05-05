const express = require('express');
const router = express.Router();
const User = require('../models/user')

// Get number of users
router.get('/getNum', async (req, res) => {
    try{
        const users = await User.find();
        const num = users.length;
        res.json({count_user: num});
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;