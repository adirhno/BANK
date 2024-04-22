const jwt = require("jsonwebtoken");
require('dotenv').config();

function refreshAuthMiddleWare(req, res, next) {
	const { refresh } = req.cookies;
	const { user } = req.cookies;

	try {
		const payload = jwt.verify(refresh, process.env.REFRESH_TOKEN);
		if (payload) {
			const newToken = jwt.sign({ user }, process.env.TOKEN, { expiresIn: "2h" });
			res.cookie("token", newToken, {
				httpOnly: true,
				sameSite: "none",
				maxAge: 900000,
				secure: true,
			});
			next();
		}
	} catch (error) {
		res.clearCookie("refresh").send("Invalid JWT token!");
	}
}

module.exports = { refreshAuthMiddleWare };
