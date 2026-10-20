
# 🧠 RPS M.I.N.D (Move Interpretation & Next-move Decisions)

### Rock Paper Scissors — but what if your opponent could learn your patterns?

A Rock Paper Scissors game built with **Vanilla JavaScript**, featuring a custom event-driven architecture and an experimental AI engine designed to evolve beyond random decisions.

The mission is simple: build a lightweight game from scratch, experiment with clean architecture, and gradually turn a basic opponent into a smarter, more adaptive competitor.

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JavaScript" />
  <img src="https://img.shields.io/badge/Architecture-Event--Driven-6366F1?style=for-the-badge" alt="Event-driven architecture" />
  <img src="https://img.shields.io/badge/Status-In%20Development-0EA5E9?style=for-the-badge" alt="In development" />
</p>

---

## 🎮 The Game

Rock Paper Scissors is easy to play. Building a good opponent is the challenge.

Play against an AI opponent, watch its reactions, and explore the foundations of a decision engine that keeps track of previous moves and analyzes player behavior.

The current AI still chooses moves randomly. Its memory and frequency-analysis systems are the first steps toward something more strategic.

<!-- A gameplay GIF or screenshot will be added here when available. -->

## ✨ Features

- **🧠 Experimental AI Engine** — A dedicated `decisionEngine` controls the AI's move selection and provides a foundation for increasingly sophisticated strategies.
- **📚 Move Memory** — Records player and AI moves in a shared history, creating a dataset for future behavioral analysis.
- **📊 Move Frequency Analysis** — Counts and ranks the player's most frequently used moves. The analysis is not yet connected to the AI's decision-making process.
- **📡 Custom EventBus** — A lightweight Publish/Subscribe system decouples gameplay logic, UI updates, and game events.
- **🎯 Dedicated Game State** — Validates moves, tracks the latest player and AI choices, and evaluates wins, losses, and draws.
- **⏳ Asynchronous Gameplay** — Uses `async/await` and promises to introduce a thinking delay without blocking the browser's main JavaScript execution thread.
- **🧰 Reusable Utilities** — Shared helpers handle DOM creation, delays, temporary CSS classes, and overlay behavior.
- **🪶 Zero Frameworks** — Built with native browser APIs and Vanilla JavaScript, keeping the project lightweight and focused on core programming concepts.

## 🧩 Under the Hood

The project is organized around separate objects with distinct responsibilities:

| Component | Responsibility |
|---|---|
| `eventBus` | Event subscriptions, publishing, and communication between components |
| `gameState` | Move validation, round state, and rule evaluation |
| `decisionEngine` | AI move selection, memory, and experimental analysis |
| `ui` | DOM updates, button interactions, and AI reactions |
| `helperFunctions` | Shared utilities and asynchronous helpers |
| `mainConfig` | Connects the game's events and initializes the application |

This architecture keeps the code manageable as new features and AI strategies are introduced.

## 🔬 The AI Experiment

The interesting part isn't choosing between rock, paper, and scissors. It's exploring how an opponent could use information from previous rounds to make better decisions.

Currently, the AI selects moves randomly and records both sides' moves. A frequency-analysis method can rank the player's most common choices, but the resulting data does not yet influence the AI's strategy.

**The next milestone is to connect memory, probability, and decision-making.**

That means moving from a random opponent toward an AI that can estimate player tendencies, select counter-moves, and balance informed predictions with unpredictability.

## 🚀 Roadmap

### 🧠 Smarter AI Strategy

- [ ] Integrate move history into the decision engine.
- [ ] Estimate move probabilities from the player's previous choices.
- [ ] Predict likely next moves and choose appropriate counter-moves.
- [ ] Add pattern recognition for repeated moves and sequences.
- [ ] Experiment with different AI personalities and difficulty levels.

### 🏗️ Architecture & Code Quality

- [ ] Split the implementation into separate JavaScript modules, such as `eventBus.js`, `gameState.js`, `decisionEngine.js`, `ui.js`, and `helperFunctions.js`.
- [ ] Strengthen separation of concerns and reduce unnecessary coupling.

### 🛡️ Gameplay Reliability

- [ ] Improve turn lifecycle and reset handling.
- [ ] Prevent pending AI decisions from affecting a newly reset game.
- [ ] Ensure player input, UI state, and game state remain synchronized.
- [ ] Add safeguards against invalid or duplicate moves.
- [ ] Test edge cases involving rapid interactions and consecutive rounds.

### 🧪 Testing & User Experience

- [ ] Add tests for move validation and win/loss/draw conditions.
- [ ] Test EventBus subscriptions, unsubscriptions, and event dispatching.
- [ ] Create tests for AI memory and probability calculations.
- [ ] Improve responsive layouts and keyboard accessibility.
- [ ] Polish animations, feedback, and game restart interactions.

## 🛠️ Built With

- **JavaScript (ES6+)** — Core gameplay, event handling, asynchronous operations, and AI logic.
- **HTML5** — Application structure and interactive controls.
- **CSS3** — Styling, visual reactions, and animations.

No frameworks. No build tools required. Just the browser and JavaScript.

## 🎯 Project Goals

RPS M.I.N.D is an ongoing experiment in building interactive systems with clean code and progressively smarter decision-making.

The goal isn't just to make the game work. It's to understand the architecture behind it, improve the quality of the implementation, and explore how a simple move-history system can become the foundation of an adaptive opponent.

**From random moves to strategic decisions — one iteration at a time.**
