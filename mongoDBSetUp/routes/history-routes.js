const express = require("express");
const HistoryRouter = express.Router();
const historyController = require("../controllers/history-controllers");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");

//! for the mean time no auth and all route is public
HistoryRouter.use(checkAuth);

/* 
	* @desc        		PATCH update game history by id
	! @serverRoute    PATCH "/api/tiktaktoe/history"
  	!	@additionalRoute "/update/:game_Id"
	? @access      		private
*/

HistoryRouter.patch(
	"/update/:game_Id",
	[check("updatedGame").not().isEmpty()],
	historyController.updateGameHistory
);

/* 
	* @desc        		PATCH reset gameHistory and make new one
	! @serverRoute    PATCH "/api/tiktaktoe/history"
  	!	@additionalRoute "/reset/:game_Id"
	? @access      		private
*/
HistoryRouter.patch(
	"/reset/:game_Id",
	[check("updatedGame").not().isEmpty()],
	historyController.resetGameHistory
);

module.exports = HistoryRouter;
