const express = require("express");

const PORT = process.env.PORT;
const ConnectMongoDB = require("./databaseConnection/ConnectMongoDB");
const cors = require("cors");
const HttpError = require("./mongoDBSetUp/errorHandler/http-error");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// // games router
const GamesRouter = require("./mongoDBSetUp/routes/game-routes");
app.use("/api/tiktaktoe", GamesRouter);

// if no route is Found
app.use((req, res, next) => {
	const error = new HttpError("Route not found", 404);
	throw error;
});

app.use((err, req, res, next) => {
	if (res.headerSent) {
		return next(err);
	}
	res
		.status(err.code || 500)
		.json({ message: err.message || "An unknown error occurred" });
});

app.listen(PORT, async () => {
	await ConnectMongoDB();
	console.log(`Listening to ${PORT}`);
});
