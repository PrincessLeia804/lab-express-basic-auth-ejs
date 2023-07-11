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

    const payload = { ...req.body }
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
router.get("/login", (req, res) => {
    res.render("auth/login")
})

// POST Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body
    // check if user exist
    try {
        const userExists = await User.findOne({ username: username.toLowerCase() }) // to match

        if (userExists) {
            // compare passwords
            if (bcrypt.compareSync(password, userExists.passwordHash)) {
                loggedUser = { ...userExists._doc } // mongoose specific: needed
                res.render("auth/user-profile", {user: loggedUser})
            }
            else {
                res.render('auth/login', {
                    errorMessage: "The input combination does not match any entries",
                    prevUsername: { user: userExists.username }
                })
            }
        } else {
            res.render('auth/login', {
                errorMessage: "The combination does not match any entries",
                prevUsername: { user: userExists.username }
            })
        }
    } catch (error) {
        res.render('auth/login', {
            errorMessage: "An error occurred"
        })
    }
})

module.exports = router