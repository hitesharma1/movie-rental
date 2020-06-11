const {User, validate} = require('../models/user');
const _  = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res)=>{
    let {error} = validate(req);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User Already exist');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    await user.save(_.pick(user, ['_id', 'name', 'email']));
    res.send(user);
});

module.exports = router;