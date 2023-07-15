const express = require("express");
const GameRouter = express.Router();
const gameController = require("../controllers/game-controllers");
const { check } = require("express-validator");

/* 
	* @desc        		POST start new game
	! @serverRoute    get "/api/tiktaktoe/game"
  	!	@additionalRoute "/new"
	? @access      		public
*/
GameRouter.post(
	"/new",
	[check("player1_Name").not().isEmpty(), check("player2_Name").not().isEmpty()],
	gameController.startNewGame
);

/* 
	* @desc        		GET get all saved games
	! @serverRoute    get "/api/tiktaktoe/game"
  	!	@additionalRoute "/allGames"
	? @access      		public
*/

GameRouter.get("/allGames", gameController.allSavedGames);

/* 
	* @desc        		GET get saved game by game id
	! @serverRoute    get "/api/tiktaktoe/game"
  	!	@additionalRoute "/:game_Id"
	? @access      		public
*/
GameRouter.get("/:game_Id", gameController.getGameByGameId);

module.exports = GameRouter;
