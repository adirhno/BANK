const jwt = require("jsonwebtoken");

function authorizationMiddleWare(req, res, next) {
	const { token } = req.cookies;
	const { refresh } = req.cookies;
	const { user } = req.cookies;

	try {
		if (token !== undefined) {
			const payload = jwt.verify(token, "token", (e) => {
				console.log(e);
			});
			if (payload) {
				next();
			} else {
				const refreshToken = jwt.verify(refresh, "refresh");
				if (refreshToken) {
					const newToken = jwt.sign({ user: user }, "token", {
						expiresIn: "10s",
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
					expiresIn: "10s",
				});
				res.cookie("token", newToken, {
					httpOnly: true,
					maxAge: 900000,
				});
				next();
			}
		}
	} catch (error) {
		res.clearCookie("token").send("Invalid JWT token!");
	}
}

// if (token === undefined) {
// 			console.log("inside ")
// 			const refreshToken = jwt.verify(refresh, "refresh");
// 			if (refreshToken) {

// 				const newToken = jwt.sign({ user: user }, "token", {
// 					expiresIn: "30s",
// 				});
// 				res.cookie("token", newToken, {
// 					httpOnly: true,
// 					maxAge: 900000,
// 				});
// 				next();
// 			} else {
// 				res.clearCookie("token").send("Invalid JWT token!");
// 			}
// 		} else {
// 			const payload = jwt.verify(token, "token");
// 			console.log(payload)
// 			if (payload) {
// 				next();
// 			}
// 		}

module.exports = { authorizationMiddleWare };
