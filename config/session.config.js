const session = require("express-session")

// require mongostore
const MongoStore = require('connect-mongo')

// require mongoose 
const mongoose = require('mongoose')

module.exports = app => {
    app.set('trust proxy', 1)

    app.use(
        session({
            secret: process.env.SESS_SECRET,
            resave: true,
            saveUninitialized: false,
            cookie: {
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                maxAge: 60000 // 60 * 1000 ms === 1 min
            },
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/lab-express-basic-auth",

                // add time to live: 60sec * 60min * 24h = 1 Tag
                ttl: 60 * 5
                
            })
        }))
}