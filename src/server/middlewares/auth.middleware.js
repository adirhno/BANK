
const jwt = require("jsonwebtoken");

function authorizationMiddleWare(req, res, next) {

    const { token } = req.cookies
	try {
		const payload = jwt.verify(token, "hello");
        if(payload){
            
        }
        next()
	} catch (error) {
		res.clearCookie("token")
			.status(401)
			.send("Invalid JWT token!");
	}
}

module.exports = {authorizationMiddleWare}