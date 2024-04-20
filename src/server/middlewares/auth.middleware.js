const jwt = require("jsonwebtoken");

function authorizationMiddleWare(req, res, next) {
	const { token } = req.cookies;
	const { refresh } = req.cookies;
	const { user } = req.cookies;

	try {
		if (token !== undefined) {
			console.log("im here");
			const payload = jwt.verify(token, "token", (e) => {});
			if (payload) {
				next();
			} else {
				const refreshToken = jwt.verify(refresh, "refresh");
				if (refreshToken) {
					const newToken = jwt.sign({ user: user }, "token", {
						expiresIn: "100s",
					});
					res.cookie("token", newToken, {
						httpOnly: true,
						maxAge: 900000,
					});
					next();
				} else {
					res.clearCookie("token").send("Invalid JWT token!");
				}
			}
		} else {
			const refreshToken = jwt.verify(refresh, "refresh");
			if (refreshToken) {
				const newToken = jwt.sign({ user: user }, "token", {
					expiresIn: "100s",
				});
				res.cookie("token", newToken, {
					httpOnly: true,
					maxAge: 900000,
				});
				next();
			}
		}
	} catch (error) {
		console.log(error);
		res.clearCookie("token").send("Invalid JWT token!");
	}
}

module.exports = { authorizationMiddleWare };
