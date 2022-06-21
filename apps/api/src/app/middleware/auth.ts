import * as jwt from "jsonwebtoken";
import * as constants from "../utility/constants";

const config = process.env;

export const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(constants.statusCode403).send({ message: constants.tokenRequired });
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(constants.statusCode401).send({ message: constants.invalidToken });
    }
    return next();
};
