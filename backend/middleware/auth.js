import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {


        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }
        if (token.startsWith("Bearer ")) {
            token = token.split(" ");
        };
        const decoded = token[1].trim();
        const verified = jwt.verify(decoded, process.env.JWT_SECRET);
         req.user = verified;   
        next();
        
    } catch (err) {
        res.status(500).json({ error: err.message })
        
    }
}