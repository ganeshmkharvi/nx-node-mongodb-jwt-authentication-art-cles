import * as User from "../model/user";
import * as  bcrypt from "bcryptjs";
import * as  jwt from "jsonwebtoken";
import * as constants from "../utility/constants";
import config from '../config/config';

export async function registerService(req, res) {
    // Our register logic starts here
    try {
        // Get user input
        const { firstName, lastName, email, password } = req.body;

        // Validate user input
        if (!(email && password && firstName && lastName)) {
            res.status(constants.statusCode400).send({ message: constants.inValidInput });
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(constants.statusCode400).send({ message: constants.userAlreadyExists });
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_Id: user._id, email },
            config.tokenKey,
            {
                expiresIn: "1h",
            }
        );

        // save user token
        user.token = token;

        // return new user
        return res.status(constants.statusCode201).send(user);
    } catch (err) {
        console.log(err);
        return res.status(constants.statusCode500).send(err);
    }
    // Our register logic ends here

}

export async function loginService(req, res) {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(constants.statusCode400).send(constants.inValidInput);
        }
        // Validate if the user exists in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
         return   res.status(constants.statusCode200).json(user);
        }
       return res.status(constants.statusCode400).send({message: constants.invalidCredentials});
    } catch (err) {
        console.log(err);
    }
    // Our login logic ends here
}

export async function welcomeService(req, res) {
    return res.status(constants.statusCode200).send({message: constants.welcome});
}
