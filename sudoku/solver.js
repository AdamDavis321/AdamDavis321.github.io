/*
 * Copyright 2017 Adam Davis <adamdavis321@gmail.com>
 * Released under the MIT license.
 */

var clone = function(object) {
	function OneShotConstructor(){}
	OneShotConstructor.prototype = object;
	return new OneShotConstructor();
};

var isInArray = function(item, items) {
	for (var i = 0; i < items.length; i++) {
		if (items[i] == item) {
			return true;
		}
	}
	return false;
};

function Game(house, player) {
	this.house = house;
	this.player = player;
	this.winningOptions = [];
	this.revealedOptions = [];
	this.rounds = [];
	this.playerWon = null;
}

Game.prototype.play = function() {
	this.initWinningOptions();
	this.revealedOptions = [];
	this.rounds = [];
	var limit = this.house.numOptions - this.house.numWinning;
	for (var i = 0; i < limit; i++) {
		var choice = this.player.makeChoice(this.revealedOptions, this.house.numOptions, this.house.numWinning, 
				this.rounds);
		var reveal = this.house.revealOption(this.winningOptions, this.revealedOptions, choice, this.rounds);
		this.rounds.push(new Round(choice, reveal));
		this.revealedOptions.push(reveal);
	}
	this.playerWon = this.isWinningChoice(this.rounds[this.rounds.length - 1].choice);
};

Game.prototype.initWinningOptions = function() {
	// Randomly set winning option(s)
	for (var i = 0; i < this.house.numOptions; i++) {
		this.winningOptions[i] = false;
	}
	for (var j = 0; j < this.house.numWinning; j++) {
		do {
			var winner = Math.floor(Math.random() * this.house.numOptions);
		} while (this.winningOptions[winner]);
		this.winningOptions[winner] = true;
	}
};

Game.prototype.isWinningChoice = function(choice) {
	return (choice < this.winningOptions.length && this.winningOptions[choice]);
};

Game.prototype.resultString = function() {
	var s = 'Game: Options = ';
	for (var i = 0; i < this.winningOptions.length; i++) {
		s += ' ' + (this.winningOptions[i]? '*' : '-');
	}
	s += ', Choices =';
	for (var i = 0; i < this.rounds.length; i++) {
		s += ' ' + this.rounds[i].choice;
	}
	s += ', Reveals =';
	for (var i = 0; i < this.rounds.length; i++) {
		s += ' ' + this.rounds[i].reveal;
	}
	s += ', Won = ' + (this.playerWon? 'Yes' : 'no');
	return s;
};

Game.prototype.toString = function() {
	var s = 'Game: Options =';
	for (var i = 0; i < this.winningOptions.length; i++) {
		s += ' ' + (this.winningOptions[i]? '*' : '-');
	}
	s += ', Player = ' + this.player;
	s += ', Choices =';
	for (var i = 0; i < this.rounds.length; i++) {
		s += ' ' + this.rounds[i].choice;
	}
	s += ', Reveals =';
	for (var i = 0; i < this.rounds.length; i++) {
		s += ' ' + this.rounds[i].reveal;
	}
	s += ', Won = ' + (this.playerWon? 'Yes' : 'no');
	return s;
};

/* ---------- */

function House(name) {
	this.name = name? name : 'Monty Hall';
	this.completedGames = [];
	this.currentGame = null;
	this.numWon = 0;
}

House.prototype.run = function(numOptions, numWinning, player, numGames) {
	this.numOptions = numOptions;
	this.numWinning = numWinning;
	this.completedGames = [];
	this.numWon = 0;
	for (var i = 0; i < numGames; i++) {
		this.currentGame = new Game(this, player);
		this.currentGame.play();
		if (this.currentGame.playerWon) {
			this.numWon++;
		}
		this.completedGames.push(this.currentGame);
	}
};

House.prototype.revealOption = function(winningOptions, revealedOptions, choice, rounds) {
	// Reveal an option as a losing one, as long as it's not the winner or the current choice
	var reveal;
	if (winningOptions.length > (revealedOptions.length + 2)) {
		do {
			reveal = Math.floor(Math.random() * this.numOptions);
		} while (reveal == choice || winningOptions[reveal] || isInArray(reveal, revealedOptions));
	}
	else {
		reveal = revealedOptions[0];
	}
	return reveal;
};

House.prototype.summaryString = function() {
	var s = 'House Rules: ' + this.name;
	s += ', Number of options = ' + this.numOptions;
	s += ', Number of winning options = ' + this.numWinning;
	if (this.completedGames.length > 0) {
		s += '\nPlayer Strategy = ' + this.completedGames[0].player;
		s += ', ' + this.numWon + ' won of ' + this.completedGames.length;
		var winPct = this.numWon / this.completedGames.length * 100;
		s += ', Win % = ' + MiscUtils.formatNumber(winPct, 1, 1);
	}
	else {
		s += '\nCurrent game:\n';
		s += this.currentGame;
	}
	return s;
};

House.prototype.detailString = function() {
	var s = '';
	if (this.completedGames.length > 0) {
		s += 'Completed games:';
		for (var i = 0; i < this.completedGames.length; i++) {
			s += '\n    ' + this.completedGames[i].resultString();
		}
		var winPct = this.numWon / this.completedGames.length * 100;
		s += '\nWin % = ' + MiscUtils.formatNumber(winPct, 1, 1);
	}
	else {
		s += 'Current game:\n';
		s += this.currentGame;
	}
	return s;
};

House.prototype.toString = function() {
	var s = this.name;
	s += ', Number of options = ' + this.numOptions;
	s += ', Number of winning options = ' + this.numWinning;
	if (this.completedGames.length > 0) {
		s += '\nCompleted games:';
		for (var i = 0; i < this.completedGames.length; i++) {
			s += '\n    ' + this.completedGames[i];
		}
		var winPct = this.numWon / this.completedGames.length * 100;
		s += '\nWin % = ' + MiscUtils.formatNumber(winPct, 1, 1);
	}
	else {
		s += '\nCurrent game:\n';
		s += this.currentGame;
	}
	return s;
};

function HouseFairReveals(name) {
	House.call(this, name);
}

HouseFairReveals.prototype = clone(House.prototype);
HouseFairReveals.prototype.constructor = HouseFairReveals;

HouseFairReveals.prototype.revealOption = function(winningOptions, revealedOptions, choice, rounds) {
	// Reveal an option as a losing one, as long as it's not the winner
	var reveal;
	if (winningOptions.length > (revealedOptions.length + 2)) {
		do {
			reveal = Math.floor(Math.random() * this.numOptions);
		} while (winningOptions[reveal] || isInArray(reveal, revealedOptions));
	}
	else {
		reveal = revealedOptions[0];
	}
	return reveal;
};

/* ---------- */

function Player(name) {
	this.name = name? name : 'Never Switch';
	this.previousChoice = -1;
}

Player.prototype.makeChoice = function(revealedOptions, numOptions, numWinning, previousRounds) {
	// Make a choice for the first time, or re-make it if that choice has been revealed as a losing one
	if (previousRounds.length == 0 || isInArray(this.previousChoice, revealedOptions)) {
//		if (previousRounds.length > 0)
//			console.log('Previous choice has been revealed as a loser; choosing again.');
		do {
			this.previousChoice = Math.floor(Math.random() * numOptions);
		} while (isInArray(this.previousChoice, revealedOptions));
	}
	return this.previousChoice;
};

Player.prototype.toString = function() {
	var s = this.name;
	return s;
};

function PlayerRandomlySwitch(name) {
	Player.call(this, name);
}

PlayerRandomlySwitch.prototype = clone(Player.prototype);
PlayerRandomlySwitch.prototype.constructor = PlayerRandomlySwitch;

PlayerRandomlySwitch.prototype.makeChoice = function(revealedOptions, numOptions, numWinning, previousRounds) {
	// Always make a choice (without avoiding the previous choice)
	do {
		this.previousChoice = Math.floor(Math.random() * numOptions);
	} while (isInArray(this.previousChoice, revealedOptions));
	return this.previousChoice;
};

function PlayerAlwaysSwitch(name) {
	Player.call(this, name);
}

PlayerAlwaysSwitch.prototype = clone(Player.prototype);
PlayerAlwaysSwitch.prototype.constructor = PlayerAlwaysSwitch;

PlayerAlwaysSwitch.prototype.makeChoice = function(revealedOptions, numOptions, numWinning, previousRounds) {
	// Always make a new choice (while avoiding the previous choice)
	var choice;
	do {
		choice = Math.floor(Math.random() * numOptions);
	} while (choice == this.previousChoice || isInArray(choice, revealedOptions));
	this.previousChoice = choice;
	return this.previousChoice;
};

function PlayerSwitchAwayFromFirst(name) {
	Player.call(this, name);
	this.originalChoice = -1;
}

PlayerSwitchAwayFromFirst.prototype = clone(Player.prototype);
PlayerSwitchAwayFromFirst.prototype.constructor = PlayerSwitchAwayFromFirst;

PlayerSwitchAwayFromFirst.prototype.makeChoice = function(revealedOptions, numOptions, numWinning, previousRounds) {
	// Always make a new choice (while avoiding the original choice)
	if (previousRounds.length == 0) {
		this.originalChoice = -1;
	}
	var choice;
	do {
		choice = Math.floor(Math.random() * numOptions);
	} while (choice == this.originalChoice || isInArray(choice, revealedOptions));
	this.previousChoice = choice;
	if (previousRounds.length == 0) {
		this.originalChoice = choice;
	}
	return choice;
};

function PlayerSwitchLast(name) {
	Player.call(this, name);
}

PlayerSwitchLast.prototype = clone(Player.prototype);
PlayerSwitchLast.prototype.constructor = PlayerSwitchLast;

PlayerSwitchLast.prototype.makeChoice = function(revealedOptions, numOptions, numWinning, previousRounds) {
	// Make a choice for the first time, and re-make it at your last chance to do so
	if (previousRounds.length == 0 || (previousRounds.length + 2) == numOptions) {
//		if (previousRounds.length > 0)
//			console.log('Last chance to make a new choice.');
		var choice;
		do {
			choice = Math.floor(Math.random() * numOptions);
		} while (choice == this.previousChoice || isInArray(choice, revealedOptions));
		this.previousChoice = choice;
	}
	return this.previousChoice;
};

function PlayerSwitchFirst(name) {
	Player.call(this, name);
}

PlayerSwitchFirst.prototype = clone(Player.prototype);
PlayerSwitchFirst.prototype.constructor = PlayerSwitchFirst;

PlayerSwitchFirst.prototype.makeChoice = function(revealedOptions, numOptions, numWinning, previousRounds) {
	// Make a choice for the first time, and re-make it at your first chance to do so
	if (previousRounds.length == 0 || previousRounds.length == 1 || isInArray(this.previousChoice, revealedOptions)) {
//		if (previousRounds.length > 0)
//			console.log('First chance to make a new choice.');
		var choice;
		do {
			choice = Math.floor(Math.random() * numOptions);
		} while (choice == this.previousChoice || isInArray(choice, revealedOptions));
		this.previousChoice = choice;
	}
	return this.previousChoice;
};

/* ---------- */

function Round(choice, reveal) {
	this.choice = choice;
	this.reveal = reveal;
}
Round.prototype.toString = function() {
	var s = 'Round: Player choice = ' + this.choice;
	s += ', House reveal = ' + this.reveal;
	return s;
};
