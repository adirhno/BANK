const jwt = require("jsonwebtoken");

function authorizationMiddleWare(req, res, next) {
	const { token } = req.cookies;
	try {
		const payload = jwt.verify(token, "hello");
		if (payload) {
			console.log("here1")
			next();
		}
	} catch (error) {
		res.clearCookie("token").send("Invalid JWT token!");
	}
}

module.exports = { authorizationMiddleWare };
