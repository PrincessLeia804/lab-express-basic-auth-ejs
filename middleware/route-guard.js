// check if user is logged in

const { render } = require("../app")

const isLoggedIn = ((req, res, next) => {
    if(!req.session.user){
        return res.redirect("/auth/login")
    }
    // next needed to check add. middleware
    next()
})

// check if user is logged out
const isLoggedOut = ((req, res, next) => {
    if(req.session.user){
        return res.redirect("/")
    }
    // next needed to check add. middleware
    next()
})


module.exports = {
    isLoggedIn,
    isLoggedOut
}