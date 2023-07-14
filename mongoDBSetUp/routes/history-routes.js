const express = require("express");
const HistoryRouter = express.Router();
const historyController = require("../controllers/history-controllers");
const { check } = require("express-validator");
/* 
	* @desc        		PATCH update game history by id
	! @serverRoute    PATCH "/api/tiktaktoe"
  	!	@additionalRoute "/history/update/:game_Id"
	? @access      		public
*/

HistoryRouter.patch(
	"/history/update/:game_Id",
	[check("updatedGame").not().isEmpty()],
	historyController.updateGameHistory
);

module.exports = HistoryRouter;
