const User = require("../models/user");
module.exports.renderRegister= (req, res) => {
    res.render("users/register")
}
module.exports.register=async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registerUser = await User.register(user, password)
        //console.log(registerUser)
        req.login(registerUser, err => {
            if (err) {
                return next()
            }
            else {
                req.flash("success", "Welcome to the yelpcamp")
                res.redirect("/campground")
            }
        })
    } catch (e) {
        req.flash("error", e.message)
        res.redirect("register")
    }
}
module.exports.renderLogin=(req, res) => {
    res.render("users/login")
}
module.exports.login=(req, res) => {
    req.flash("success", "Welcome to the yelpcamp")
    const redirect=res.locals.returnTo || "/campground";
    res.redirect(redirect)
}
module.exports.logout=(req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        else {
            req.flash("success", "Thank you for visiting the yelpcamp");
            res.redirect("/");
        }
    })

}