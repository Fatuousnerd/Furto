const express = require('express');
const route = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/User');

route.post('/create', async (req, res) => {
    try {
        // console.log('Body: ', req.body);
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(401).json({ error: 'Missing details...' });

        const exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ error: 'Error! User already exists...' });

        const hashed = await bcrypt.hash(password, 10);

        const user = await new User({
            username,
            email,
            password: hashed
        });
        await user.save();

        res.status(201).json({ message: 'User created successfully...' });
    } catch (err) {
        res.status(500).json({ error: 'Error creating account...' });
        console.error('Error creating account', err);
    }
});

route.post(`/login`, async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(401).json({ error: 'Missing details...' });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found...' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(403).json({ error: 'Wrong password...' });

        // const token = await jwt.sign({ id: user._id }, process.env{expiresIn: '7d'})

        res.status(200).json({ message: 'User logged in...', user });
    } catch (err) {
        res.status(500).json({ error: 'Error logging you in...' });
        console.error('Error loggin in...', err);
    }
});

module.exports = route;