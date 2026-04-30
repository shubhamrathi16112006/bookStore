const User = require('../model/User');
const bcrypt = require('bcryptjs');

exports.getSignup = (req, res) => {
    res.render("signup", { error: null });
};

exports.postSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.redirect("/auth/login");
    } catch (err) {
        console.log(err);
        res.render("signup", { error: "Something went wrong." });
    }
};

exports.getLogin = (req, res) => {
    res.render("login", { error: null });
};

exports.postLogin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.render("login", { error: "Invalid username or password." });
        }

        if (user.username !== username) {
            return res.render("login", { error: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render("login", { error: "Invalid username or password." });
        }

        req.session.user = { id: user._id, username: user.username };
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.render("login", { error: "Something went wrong." });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/auth/login");
    });
};