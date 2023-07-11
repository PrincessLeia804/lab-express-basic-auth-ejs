const router = require('express').Router()
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');


// GET sign-up page
router.get("/signup", (req, res) => {
    res.render("auth/signup");
})

// GET profile-page path
router.get("/user-profile", (req, res) => {
    res.render("auth/user-profile")
})


// POST sign-up page
router.post("/signup", async (req, res) => {
 
    const payload = { ...req.body}
    console.log('payload: ', payload);

    // PW entered not into the DB
    delete payload.password

    // encrypt PW with 13 rounds
    const salt = bcrypt.genSaltSync(13)
    payload.passwordHash = await bcrypt.hashSync(req.body.password, salt)

    try {
        const newUser = await User.create(payload)
        res.redirect("/auth/user-profile")
        // res.send(newUser)
    } catch (error) {
        console.log("The new user couldn't be created");
    }
})

// GET login page


module.exports = router