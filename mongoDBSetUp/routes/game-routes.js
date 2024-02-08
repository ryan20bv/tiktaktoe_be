const express = require('express');
const GameRouter = express.Router();
const gameController = require('../controllers/game-controllers');
const {check} = require('express-validator');

/* 
	* @desc        		POST game access by password
	! @serverRoute    POST "/api/tiktaktoe/game"
  !	@additionalRoute "/access"
	? @access      		public
*/

GameRouter.post(
	'/access',
	[check('game_id').not().isEmpty(), check('password').isLength({min: 4})],
	gameController.accessGame
);

/* 
	* @desc        		POST start new game
	! @serverRoute    get "/api/tiktaktoe/game"
  	!	@additionalRoute "/new"
	? @access      		public
*/
GameRouter.post(
	'/new',
	[
		check('player1_Name').not().isEmpty(),
		check('player2_Name').not().isEmpty(),
		check('password').isLength({min: 4})
	],
	gameController.startNewGame
);

/* 
	* @desc        		GET get all saved games
	! @serverRoute    get "/api/tiktaktoe/game"
  	!	@additionalRoute "/allGames"
	? @access      		public
*/

GameRouter.get('/allGames', gameController.allSavedGames);

/* 
	* @desc        		GET get saved game by game id
	! @serverRoute    get "/api/tiktaktoe/game"
  	!	@additionalRoute "/:game_Id"
	? @access      		public
*/
GameRouter.get('/:game_Id', gameController.getGameByGameId);

/* 
	* @desc        		DELETE  saved game by game id
	! @serverRoute    delete "/api/tiktaktoe/game"
  	!	@additionalRoute "/:game_id"
	? @access      		private need password to delete
*/

GameRouter.delete(
	'/:game_id',
	[check('password').isLength({min: 4})],
	gameController.deleteGameById
);

// pagination
/* 
	* @desc        		POST get saved games 10 per view
	! @serverRoute    POST "/api/tiktaktoe/game"
  	!	@additionalRoute "/pagination"
	? @access      		private need password to delete
*/

GameRouter.post(
	'/pagination',
	[check('page').notEmpty()],
	gameController.getSavedGamesLimitToTen
);

module.exports = GameRouter;
