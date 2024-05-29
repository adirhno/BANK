const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const passwordValidator = require("password-validator");
const passwordValidatorSchema = new passwordValidator();

class UserController {
	async updateUserDetails(req, res) {
		const { userName, currPassword, newPassword, userEmail } = req.body;
		passwordValidatorSchema.has().not().spaces().is().min(8);
        
		try {
			const user = await User.findOne({ email: userEmail });
			const passwordVerified = bcrypt.compareSync(
				currPassword,
				user.password
			);
			if (!passwordVerified) throw "invalid password";
			if (!passwordValidatorSchema.validate(newPassword))throw "validationErr";

			const saltRounds = 10;
			const salt = bcrypt.genSaltSync(saltRounds);
			const hashedPassword = bcrypt.hashSync(newPassword, salt);

			User.findOneAndUpdate(
				{ email: userEmail },
				{ $set: { password: hashedPassword, userName: userName }},{new: true}
			).exec();
			res.send("details updated!");
		} catch (error) {
			if(error == "invalid password" || error == "validationErr") {
            res.status(401).send(error);
            }else{
                res.sendStatus(400);
            }
            
		}
	}
}

const userController = new UserController();
module.exports = userController;
