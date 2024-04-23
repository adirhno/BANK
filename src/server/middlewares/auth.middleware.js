const jwt = require("jsonwebtoken");
require("dotenv").config();

function authorizationMiddleWare(req, res, next) {
	const { token } = req.cookies;

	try {
		const payload = jwt.verify(token, process.env.TOKEN);
		if (payload) {
			next();
		}
	} catch (error) {
		res.clearCookie("token").send("Invalid JWT token!");
	}
}

module.exports = { authorizationMiddleWare };
