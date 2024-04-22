const jwt = require("jsonwebtoken");

function authorizationMiddleWare(req, res, next) {
	const { token } = req.cookies;
	const { user } = req.cookies;

	try {
		console.log(token)
		const payload = jwt.verify(token, "token");
		if (payload) {
			next()
		}
	} catch (error) {
		res.clearCookie("token").send("Invalid JWT token!");
	}
}

module.exports = { authorizationMiddleWare };
