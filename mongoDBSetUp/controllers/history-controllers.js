const { validationResult } = require("express-validator");
const HttpError = require("../errorHandler/http-error");
const HistoriesModel = require("../models/HistoriesModel");
const GamesModel = require("../models/GamesModel");
const mongoose = require("mongoose");

/* 
	* @desc        		PATCH update game history by id
	! @serverRoute    PATCH "/api/tiktaktoe/history"
  	!	@additionalRoute "/update/:game_Id"
	? @access      		public
*/

const updateGameHistory = async (req, res, next) => {
	const { updatedGame } = req.body;
	const game_Id = req.params.game_Id;
	// console.log(updatedGame);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// return res.status(400).json({ errors: errors.array() });
		return next(new HttpError("No entered History", 422));
	}
	let foundSavedGame;
	try {
		foundSavedGame = await GamesModel.findById(game_Id);
	} catch (err) {
		const error = new HttpError(
			"updateGameHistoryNetwork  foundSavedGame error",
			500
		);
		return next(error);
	}
	if (!foundSavedGame) {
		const error = new HttpError("No game found by id", 500);
		return next(error);
	}

	let foundHistory;
	try {
		foundHistory = await HistoriesModel.findById(updatedGame.history._id);
	} catch (err) {
		const error = new HttpError(
			"updateGameHistoryNetwork foundHistory error",
			500
		);
		return next(error);
	}
	if (!foundHistory) {
		const error = new HttpError("No game history found id", 500);
		return next(error);
	}

	if (game_Id !== foundHistory.game_id.toString()) {
		const error = new HttpError("not same game id", 500);
		return next(error);
	}

	foundSavedGame.draw = updatedGame.draw;
	foundSavedGame.player1 = { ...updatedGame.player1 };
	foundSavedGame.player2 = { ...updatedGame.player2 };
	foundSavedGame.playerTurn = updatedGame.playerTurn;
	foundSavedGame.gameIsDone = updatedGame.gameIsDone;
	foundHistory.gameHistory = updatedGame.history.gameHistory;
	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await foundSavedGame.save();
		await foundHistory.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		console.log(err);
		const error = new HttpError("Cant update Game, please try again", 422);
		return next(error);
	}
	const latestUpdateGame = await foundSavedGame.populate({ path: "history" });
	res.status(201).json({ latestUpdateGame, message: "history updated" });
	// res.status(201).json({ message: "updating!" });
};

/* 
	* @desc        		PATCH reset gameHistory and make new one
	! @serverRoute    PATCH "/api/tiktaktoe/history"
  	!	@additionalRoute "/reset/:game_Id"
	? @access      		public
*/

const resetGameHistory = async (req, res, next) => {
	const { updatedGame } = req.body;
	const game_Id = req.params.game_Id;
	console.log(game_Id);
	console.log(updatedGame);
};

exports.updateGameHistory = updateGameHistory;
exports.resetGameHistory = resetGameHistory;
