

// const express = require("express");
// const mongoose = require("mongoose");
// const createRoute = require("./Router/todoRoute.js");
// const userRoute = require ("./Router/usersRoute.js");

// const app = express();

// require("dotenv").config();

// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const DB_URL = process.env.MONGO_URL;

// // MongoDB connection
// mongoose.connect(DB_URL)
// .then(() => {
//     console.log(process.env.MONGO_URL);
//     console.log("MongoDB connected successfully");

//     // routes
//     app.use("/user", userRoute);
//     app.use("/todo", createRoute);

//     // start server AFTER DB connection
//     app.listen(PORT, () => {
//         console.log(`server is running at PORT ${PORT}`);
//     });
// })
// .catch((error) => {
//     console.log("MongoDB connection error:", error);
// });



require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const createRoute = require("./Router/todoRoute.js");
const auth = require("./middleware/auth.js");
const userRoute = require("./Router/UsersRoute");
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_URL;

//MIDDLE-WARE
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

//DB Connection
mongoose.connect(DB_URL)


    .then(() => {
        console.log("MongoDB connected successfully");

        app.use("/user", userRoute);
        // app.use(auth);
        app.use("/todo", createRoute);

        app.listen(PORT, () => {
            console.log(`server is running at PORT ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error.message);
    });