const router = require('express').Router()
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

// GET sign-up page
router.get("/signup", (req, res) => {
    res.render("auth/signup");
})

// POST sign-up page
router.post("/signup", async (req, res) => {
 
    const payload = { ...req.body}

    // PW entered not into the DB
    delete payload.password

    // encrypt PW with 13 rounds
    const salt = bcrypt.genSaltSync(13)
    payload.passwordHash = bcrypt.hashSync(req.body.password, salt)

    try {
        const newUser = await User.create(payload)
        res.send(newUser)
    } catch (error) {
        console.log("The new user couldn't be created");
    }
})

// GET login page


module.exports = router