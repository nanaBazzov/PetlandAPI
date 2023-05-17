//A controller that manages authorization requests created by a provider.

const UserModel = require("../Model/UserModel");
const jwt = require("jsonwebtoken"); // תקן להעברת מידע כתוב בין 2 צדדי בפורמט גייסון ויחידות המידע מיוצגות כאובייקט גייסון

const maxAge = 3*24*60*60 // 3days

// user id that is returned by mongodb
// jwt.sign - will assign a new jwt token
const createToken = (id) => {
    return jwt.sign({ id }, " super secret key", {
        expiresIn: maxAge,
    });
};

// handles all our possible errors
const handleErrors = (err) => {
    let errors = {email:"", password:""};

    if (err.message ==="incorrect email")
        errors.email = "That Email is Not Registered";

    if (err.message ==="incorrect password")
        errors.email = "That Password is Incorrect";


    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};


module.exports.signup = async (req, res, next) => {
    try {
        const {email, password } = req.body;
        const user = await UserModel.create({email, password});
        const token = createToken(user._id);


        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });

        res.status(201).json({ user: user._id, created: true });
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({errors, created: false})
    }
};



module.exports.login = async (req, res,next) => {

    try {
        const { email, password } = req.body;
        console.log(email,password)
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id, status: true });
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, status: false });
    }
};