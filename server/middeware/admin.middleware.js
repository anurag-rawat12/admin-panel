import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const authorize = async (req, res, next) => {

    try {

        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json(
                {
                    message: 'Unauthorized'
                });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);

        if (decoded.role !== 'admin') {
            return res.status(403).json(
                {
                    message: 'Forbidden'
                });
        }
        req.user = decoded;
        next();


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });

    }

}
export default authorize;