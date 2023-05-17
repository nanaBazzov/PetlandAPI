// אנחנו מייצרים כאן סכימה שמגדירה את המבנה והתוכן של הנתונים שלנו

const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // מגן לנו על הסיסמאות ומגנה מפני פיצוח סיסמאות


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
});

// before saving it to the database
//  אנחנו מאבטחים את הסיסמאות שלנו , וכעת כאשר נשמור יוזר חדש הסיסמא שלו תהיה מאובטחת
userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});



// אובייקט סטטיים המוגדרים כעת בסכימה זו.
userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email}); // we check if there if a user
    if(user){
        const auth= await bcrypt.compare(password, user.password); // we compare the password with the hash
        if (auth){ // if everything is okay we have the user
            return user;
        }

        throw Error("incorrect password");

            }

        throw Error("incorrect email");
};

module.exports = mongoose.model("Users", userSchema);