const jwt = require("jsonwebtoken");

function refreshAuthMiddleWare(req, res, next) {
	const { refresh } = req.cookies;
	const { user } = req.cookies;

	try {
		const payload = jwt.verify(refresh, "refresh");
		if (payload) {
			const newToken = jwt.sign({ user }, "token", { expiresIn: "60s" });
			res.cookie("token", newToken, {
				httpOnly: true,
				sameSite: 'none',
				maxAge: 900000,
				secure: true
			});
			next()
		}
	} catch (error) {
		res.clearCookie("refresh").send("Invalid JWT token!");
	}
}

module.exports = { refreshAuthMiddleWare };
