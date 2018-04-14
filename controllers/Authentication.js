var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");

var userController = {};

// Registering a User into Database
userController.register = function (request, response) {

    var user = request.body.username;
    var pass = request.body.password;
    var name = request.body.name;
    var desc = request.body.description;

    User.register(new User({ username: user, name: name, description: desc }), pass, function (err, user) {

        if (err) {
            return response.render('/', { title: 'Project Management Tool' });
        }

        passport.authenticate('local')(request, response, function () {
            response.redirect('/profile');

        });

    });

    //console.log(username);

};

// Login function for user
userController.login = function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) { return next(err) }
        if (!user) {
            //res.local("username", req.body.username);

            var string = encodeURIComponent('login failed');
            return res.redirect('/?status=' + string);
        }

        // make passportjs setup the user object, serialize the user, ...
        req.login(user, {}, function (err) {
            if (err) { return next(err) };
            return res.redirect("/profile");
        });
    })(req,res,next);
    return;
}

userController.logout = function (req, res, next) {
    req.logout();

    var string = encodeURIComponent('logout');
    res.redirect('/?status=' + string);
};

module.exports = userController;