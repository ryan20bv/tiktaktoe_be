const jwt = require("jsonwebtoken");

const HttpError = require("../errorHandler/http-error");

module.exports = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next();
	}
	try {
		const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
		if (!token) {
			throw new Error("Authentication failed!");
		}
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.gameData = { game_id: decodedToken.game_id };
		next();
	} catch (err) {
		const error = new HttpError("Authentication failed!", 403);
		return next(error);
	}
};
