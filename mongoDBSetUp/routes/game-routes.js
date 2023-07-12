const express = require("express");
const GameRouter = express.Router();
const gameController = require("../controllers/game-controllers");

/* 
	* @desc        		GET test route
	! @serverRoute    get "/api/tiktaktoe"
  	!	@additionalRoute "/"
	? @access      		public
*/
GameRouter.get("/", gameController.testRoute);

/* 
	* @desc        		POST start new game
	! @serverRoute    get "/api/tiktaktoe"
  	!	@additionalRoute "/new"
	? @access      		public
*/
GameRouter.post("/new", gameController.startNewGame);

module.exports = GameRouter;
