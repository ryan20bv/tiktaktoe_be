const { validationResult } = require("express-validator");
const HttpError = require("../errorHandler/http-error");
const HistoriesModel = require("../models/HistoriesModel");
const mongoose = require("mongoose");

/* 
	* @desc        		PATCH update game history by id
	! @serverRoute    PATCH "/api/tiktaktoe"
  	!	@additionalRoute "/history/update/:game_Id"
	? @access      		public
*/

const updateGameHistory = async (req, res, next) => {
	const { newHistory } = req.body;
	const game_Id = req.params.game_Id;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// return res.status(400).json({ errors: errors.array() });
		return next(new HttpError("No entered History", 422));
	}

	let foundHistory;
	try {
		foundHistory = await HistoriesModel.findById(newHistory._id);
	} catch (err) {
		const error = new HttpError("updateGameHistorynetwork error", 500);
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

	foundHistory.gameHistory = newHistory.gameHistory;
	const updatedHistory = await foundHistory.save();
	res.status(201).json({ updatedHistory, message: "history updated" });
};

exports.updateGameHistory = updateGameHistory;
