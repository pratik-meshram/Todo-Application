const User = require("../Models/userModels.js");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = z.object({
    userName: z.string().min(3, { message: "usernage 3-18 char" }).max(18),
    email: z.string().email({ message: " Not valide email.." }),
    password: z.string().min(8, { message: "Password must be 8-18 characters" }).max(18)
});

//registration with validationss
const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const validation = userSchema.safeParse({ userName, email, password });

        if (!validation.success) {
            const errorMessage = validation.error.issues.map((err) => err.message);
            return res.status(400).json({ errors: errorMessage });
        }

        const userData = await User.findOne({ email });

        if (userData) {
            return res.status(400).json({ message: "User already registered" });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ userName, email, password: hashedPassword });
        await newUser.save();
        if (newUser) {
            res.status(200).json({ message: "new user resgitsred sucessfully.." })
            console.log(newUser);
        }
    }

    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while registering user" });
    }
}



// here its login
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // JWT TOKEN
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // localhost
            sameSite: "lax",
        });

        return res.status(200).json({ message: "Login successfully", token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while login user" });
    }
};




const logout = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};




module.exports = { register, login, logout };