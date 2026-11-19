const mainConfig = {
  init() {    
    eventBus.subscribe("playerMove", (move) => {
      ui.updateText(ui.playerMove, move);
      gameState.getMove({ player: "player", move });
			decisionEngine.rememberMove(true, move);
      decisionEngine.setMove();
      ui.setButtonsDisabled(true);
    }, "playerMoveSubs");

    eventBus.subscribe("move", ({ player, move }) => {
      ui.updateText(ui.aiMove, move);
      gameState.getMove({ player, move });
    }, "aiMoveSubs");
    
    eventBus.subscribe("aiThinking", () => {
      ui.aiReactions.setReaction("thinking");
      ui.updateText(ui.aiMove, "thinking...");
    }, "aiThinking");
    
    eventBus.subscribe("playerWon", () => {
      ui.aiReactions.setReaction("playerWon");
      ui.updateText(ui.gameResult, "You won!");
    }, "playerWonSubs");

    eventBus.subscribe("aiWon", () => {
      ui.aiReactions.setReaction("aiWon");
      ui.updateText(ui.gameResult, "AI won!");
    }, "aiWonSubs");

    eventBus.subscribe("draw", () => {
      ui.aiReactions.setReaction("draw");
      ui.updateText(ui.gameResult, "Draw!");
    }, "drawSubs");

    eventBus.subscribe("reset", () => {
      gameState.resetGame();
      ui.setButtonsDisabled(false);
      ui.updateText(ui.playerMove, "thinking...");
      ui.updateText(ui.aiMove, "nothing yet");
      ui.updateText(ui.gameResult, "Waiting...");
  ui.aiReactions.setReaction("surprised"); 
    }, "resetGame");
  }
};

const eventBus = {
	subs: [],
	subscribe(listening, callback, key){
		if(this.subs.some(n => n.key === key)) return;
		this.subs.push({listening, callback, key});
	},
	unsubscribe(key){
		this.subs = this.subs.filter(
    n => !(n.key === key));
},
	emit(listening, data){
		this.subs.forEach(n => {
			if (n.listening === listening) n.callback?.(data);
		});
	}
};

const gameState = {
  moves: {
    ROCK: "rock",
    SCISSORS: "scissors",
    PAPER: "paper",
  },

  playerLastMove: null,
  aiLastMove: null,

  getMove({ player, move }) {
    const validMove = this.setMove(move);

    if (!validMove) return;

    if (player === "player") {
      this.playerLastMove = validMove;
    } else {
      this.aiLastMove = validMove;
    }

    if (this.playerLastMove && this.aiLastMove) {
      this.verifyGameRules( this.playerLastMove, this.aiLastMove);
    }
  },

  setMove(move) {
    if (!Object.values(this.moves).includes(move)) {
      return null;
    }
    return move;
  },
  verifyGameRules(playerMove, aiMove) {
    // is draw
    if (playerMove === aiMove) {
      eventBus.emit("draw");
      return;
    }

    // rock beats scissors
    if (playerMove === this.moves.ROCK &&      aiMove === this.moves.SCISSORS) {
      eventBus.emit("playerWon");
      return;
    }

    // scissor beats paper
    if (playerMove === this.moves.SCISSORS && aiMove === this.moves.PAPER ) {
      eventBus.emit("playerWon");
      return;
    }

    // paper beats rock
    if (playerMove === this.moves.PAPER && aiMove === this.moves.ROCK) {
      eventBus.emit("playerWon");
      return;
    }
    eventBus.emit("aiWon");
  },
	resetGame(){
		this.playerLastMove = null;
		this.aiLastMove = null;
	}
};

// AI
const decisionEngine = {
	memory: [],
	counters: {
    rock: "paper",
    paper: "scissors",
    scissors: "rock"
},
	async setMove() {
		// It's experimental for now. In the future, I want to add new rules to make the Al more difficult to beat
  const moves = Object.values(gameState.moves);
		
	let move;
	const analysis = this.analyzeMemory();
		
  const bestMove = this.counters[analysis.mostPlayed[0][0]];
	
  if (bestMove){
		move = bestMove;
	} else {
		move = moves[Math.floor(Math.random() * moves.length)];
	}
		
	console.log(bestMove, move)
		
	this.rememberMove(false, move);
	eventBus.emit("aiThinking");
  await helperFunctions.delay(2000, "aiThinking");
  eventBus.emit("move", { player: "ai", move });
},
rememberMove(isPlayer, move) {
    if (!move) return;
    this.memory.push({ player: isPlayer ? "Player" : "AI", move });
	console.log(this.memory);
},
	analyzeMemory() {
    const playerMoves = this.memory.filter(
        play => play.player === "Player"
    );

    const moveCounts = {};

    playerMoves.forEach(({ move }) => {
        const moveName =
            typeof move === "object" && move !== null
                ? move.name ?? move.id ?? move.type ?? JSON.stringify(move)
                : move;

        moveCounts[moveName] = (moveCounts[moveName] || 0) + 1;
    });

    const mostPlayed = Object.entries(moveCounts)
        .sort((a, b) => b[1] - a[1]);
    return { mostPlayed };
},
	verifyProbability(memory, move) {
    const playerMoves = memory.filter(
        play => play.player === "Player"
    );

    const playerPlayed = playerMoves.filter(
        play => play.move === move
    );

    const probability = helperFunctions.calculateProbability(
        playerPlayed.length,
        playerMoves.length
    );

    return probability;
},
};

const ui = {
	game: document.getElementById("game"),
	gameTitle: document.getElementById("game-title"),

	aiMove: document.getElementById("ai-move-value"),
	aiReaction: document.getElementById("ai-reaction"),
	aiContainer: document.getElementById("ai-container"),
	playerMove: document.getElementById("player-move-value"),
	gameResult: document.getElementById("game-result-value"),

	moveButtons: document.getElementById("move-buttons"),

	rockButton: document.getElementById("rock-button"),
	scissorsButton: document.getElementById("scissors-button"),
	paperButton: document.getElementById("paper-button"),
	init() {
    this.setListening(this.rockButton, "playerMove", "rock");
    this.setListening(this.scissorsButton, "playerMove", "scissors");
    this.setListening(this.paperButton, "playerMove", "paper");
		 this.updateText(this.playerMove, "thinking...");
    this.updateText(this.aiMove, "nothing yet");
    this.updateText(this.gameResult, "Welcome!");
		this.aiReactions.setReaction("surprised");
},
	setListening(element, listening, move){
		element.addEventListener("click", () => {
			eventBus.emit(listening, move);
		})
	},
	setButtonsDisabled(isDisabled) {
    this.rockButton.disabled = isDisabled;
    this.scissorsButton.disabled = isDisabled;
    this.paperButton.disabled = isDisabled;
},
	updateText(element, value) {
    if (!element) return;
    element.textContent = value;
},
	aiReactions: {
    playerWon: "fa-face-dizzy",
    aiWon: "fa-face-laugh-beam",
    draw: "fa-scale-balanced",
    surprised: "fa-bolt",
    angry: "fa-fire",
    cheating: "fa-user-secret",
    chaos: "fa-wand-magic-sparkles",
		thinking: "fa-brain",

    setReaction(reaction) {
    const icon = this[reaction];
    if (!icon) return;

    ui.aiReaction.className = `ai-reaction fa-solid ${icon}`;

    helperFunctions.applyTempClass(
        ui.aiContainer,
        "animate"
    );
}
},
};

const helperFunctions = {
  keys: [],
  createElement(type, parent, className) {
    const element = document.createElement(type);
    element.classList.add(className);
    parent.appendChild(element);
    return element;
  },
  createButton(parent, className, FAName) {
    const button = this.createElement("button", parent, className);
    if (FAName) {
      const icon = this.createElement("i", button, FAName);
      icon.classList.add("fa");
    }
    return button;
  },
  createIcon(parent, FAName) {
    const icon = this.createElement("i", parent, FAName);
    icon.classList.add("fa");
    return icon;
  },
  createTestButton(callback, dataTooltip) {
    const button = this.createButton(document.body, "testButton", "fa-hammer");
    if (dataTooltip) {
      button.classList.add("tooltip");
      button.dataset.tooltip = dataTooltip;
    }
    if (callback) button.addEventListener("click", () => {
      callback();
    });
  },
  delay(ms, key) {
    const existing = this.keys.find(n => n.key === key);

    if (existing) {
      return existing.promise;
    }

    const promise = new Promise(resolve => {
      setTimeout(() => {
        this.keys = this.keys.filter(n => n.key !== key);
        resolve();
      }, ms);
    });

    this.keys.push({key, promise});

    return promise;
  },
  applyTempClass(element, className, callback) {
    if (!element) return;
    const onEnd = () => {
      element.classList.remove(className);
      element.removeEventListener("animationend", onEnd);
      if (callback) callback();
    };
    element.addEventListener("animationend", onEnd);
    element.classList.add(className);
    void element.offsetWidth;
  },
	createInfoBox(infoArray, className = "", variant = "default") {
    const container = this.createElement("div", `info-box ${className}`.trim());

    container.classList.add(`info-box--${variant}`);

    infoArray.forEach(({ title, subtitle }) => {
        const card = this.createElement("div", "info-box__card");

        const titleElement = this.createElement("h3", "info-box__title");
        titleElement.textContent = title;

        const subtitleElement = this.createElement("p", "info-box__subtitle");
        subtitleElement.textContent = subtitle;
			
        card.append(titleElement, subtitleElement); container.appendChild(card);});

    return container;
},
	calculateProbability(favorable, possible) {
    if (possible <= 0 || favorable < 0 || favorable > possible) {
        throw new Error("Valores inválidos");
    }

    return favorable / possible;
	},
  overlayManager: {
    overlayElement: null,
    createOverlay(callback) {
      if (this.overlayElement) return;
      this.overlayElement = helperFunctions.createElement("div", document.body, "overlay");
      this.overlayElement.addEventListener("click", () => {
        try {
          callback?.();
        } finally {
          this.overlayElement?.remove();
          this.overlayElement = null;
        }
      });
    },
  },
  setOverlay(callback) {
    this.overlayManager.createOverlay(callback);
  },
  showInfoText(text) {
    text = String(text);
    const textBox = this.createElement("div", document.body, "infoText");
    textBox.textContent = text;
    this.applyTempClass(textBox, "show", () => {
      textBox.remove();
    });
  },
};


mainConfig.init();
ui.init();
helperFunctions.createTestButton(() => {
	eventBus.emit("reset");
}, "try again");
helperFunctions.showInfoText("The hammer button is to reset the game. I'll change this in the future, btw!");


// cpu win     → 😏  fa-face-smile-wink
// player win   → 😭  fa-face-sad-tear
// draw        → 😐  fa-face-meh
// cpu woow   → 😳  fa-face-surprise
// cpu lost     → 😡  fa-face-angry
// cpu going hard   → 🤖  fa-robot
// cpu in chaos    → 💀  fa-skull
// I'll make svgs to cpu states
