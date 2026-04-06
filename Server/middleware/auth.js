// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//     try {
//         const token = req.headers.authorization;

//         if (!token) {
//             return res.status(401).json({ message: "No token, access denied" });
//         }

//         const verified = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = verified; // user data store

//         next(); // go in the next route 

//     } catch (error) {
//         return res.status(401).json({ message: "Invalid token" });
//     }
// };

// module.exports = authMiddleware;


        



const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Bearer TOKEN format handle
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;
        console.log(verified);

        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;