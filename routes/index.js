const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// GET profile-page path
router.get("/user-profile", (req, res) => {
  if (!req.session.user) {
    res.redirect("/auth/login")
  } else {
    res.render("user-profile", { user: req.session.user })
  }
})

module.exports = router;
