✊ RPS Mind: Vanilla JS AI

A lightweight, event-driven Rock Paper Scissors game built from scratch with Vanilla JavaScript, a custom Pub/Sub EventBus, and an adaptive CPU opponent.

"CSS3" (https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
"JavaScript" (https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
"Architecture" (https://img.shields.io/badge/Architecture-Pub%2FSub-8A2BE2.svg?style=for-the-badge)
"AI" (https://img.shields.io/badge/AI-Adaptive%20Logic-FF6F00.svg?style=for-the-badge)

This project is a functional Rock Paper Scissors game developed entirely with Vanilla JavaScript. It explores software architecture concepts such as event-driven communication, state management, modular code organization, and basic adaptive AI logic without relying on external frameworks.

The CPU opponent keeps track of the player's previous moves and uses that history to predict their most frequent choice, selecting the corresponding counter-move.

✨ Features

* Event-Driven Architecture: A custom "EventBus" based on the Publish/Subscribe pattern manages communication between game logic, player input, AI decisions, and UI updates, keeping the main components loosely coupled.
* Modular Game State: The "gameState" object centralizes move validation, round state, and game rules, separating gameplay logic from DOM manipulation.
* Adaptive CPU Opponent: The "decisionEngine" stores player and CPU moves in an in-memory history and analyzes the player's most frequently selected move to choose a counter.
* Move Prediction & Counter Logic: Uses a predefined counter table to determine which move beats the player's most frequent choice: Paper beats Rock, Scissors beats Paper, and Rock beats Scissors.
* Game Result Detection: Automatically evaluates both moves and identifies wins, losses, and draws according to the classic Rock Paper Scissors rules.
* CPU Thinking State: The AI uses an asynchronous delay to simulate decision-making, triggering a dedicated thinking state before revealing its move.
* Dynamic AI Reactions: The UI changes the CPU's reaction icon according to the current game state, including wins, losses, draws, and thinking animations.
* Interactive UI: Player input is handled through dedicated buttons, with controls temporarily disabled while the CPU is processing its move.
* Dynamic DOM Helpers: A collection of reusable utility functions handles element creation, button generation, icons, temporary messages, overlays, and CSS animations.
* Temporary CSS Animations: Uses "animationend" events to remove animation classes after their execution, allowing visual feedback to be triggered dynamically.
* Game Reset: The current round state can be cleared through a reset event, allowing the game to start another round while preserving the AI's move history during the session.

🧠 AI Decision Engine

The CPU currently uses a frequency-based strategy rather than machine learning.

Its decision process works by:

1. Recording the player's selected move.
2. Analyzing the player's move history.
3. Identifying the most frequently played move.
4. Looking up the corresponding counter-move.
5. Simulating a thinking period before revealing its choice.

The project also includes a probability calculation method that can be used as a foundation for more advanced decision-making strategies.

However, probability analysis is not yet integrated into the CPU's main decision process. The current implementation primarily relies on move frequency and a predefined counter table.

🏗️ Architecture

The codebase is organized around a few main components:

* "mainConfig": Initializes the application by registering the main EventBus subscriptions and connecting game events to UI updates.
* "eventBus": Handles event subscriptions, unsubscriptions, and event emission, allowing different components to communicate without direct dependencies.
* "gameState": Manages the current round, validates moves, stores the last actions, and evaluates the game rules.
* "decisionEngine": Handles the CPU's move history, analyzes player behavior, and selects its next move.
* "ui": Manages DOM references, player input, displayed text, button states, and CPU reactions.
* "helperFunctions": Provides reusable utilities for DOM creation, asynchronous delays, temporary CSS classes, overlays, and probability calculations.

🛠️ Technologies Used

* Vanilla JavaScript (ES6+): Core game logic, EventBus implementation, AI decision engine, asynchronous operations, and DOM manipulation.
* CSS3: Visual styling, animations, UI transitions, and responsive layout.
* HTML5: Structural foundation for the game interface.
* Font Awesome: Icon classes used for the CPU's reactions and interface elements.

---

🚧 Current Limitations

The project is functional, but several parts are still experimental or incomplete:

* Incomplete UI: The current interface handles the essential gameplay interactions, but still needs visual refinement, better organization, and additional interface elements.
* Missing Dedicated Reset Button: The reset functionality currently relies on a temporary hammer button dynamically injected into the document. It is a testing solution, not a proper reset control integrated into the main game interface.
* Basic CPU Strategy: The opponent currently focuses on the player's most frequently selected move. It does not yet combine multiple prediction strategies or perform deeper behavioral analysis.
* Unused Probability Analysis: Methods such as "verifyProbability" are available in the codebase but are not currently used by the main decision engine.
* Limited Game Flow: The current round ends with the input buttons disabled until the game is reset. A more complete round-management system is still needed.
* Code Organization: Although the application is divided into logical objects, the code can be further reorganized to improve readability, maintainability, and separation of responsibilities.

🚀 Future Improvements

* Enhanced AI Decision Engine: Introduce more sophisticated prediction strategies, probability-based decisions, and behavioral analysis to make the CPU less predictable and more challenging.
* Weighted Move History: Experiment with prioritizing recent player moves instead of treating the entire session history equally.
* Dedicated Reset Button: Replace the temporary hammer test button with a proper reset control integrated into the game's UI.
* Improved UI/UX: Redesign the interface with a more polished visual identity, smoother transitions, better feedback, and a more complete gameplay experience.
* Custom CPU Animations: Replace the current icon-based reactions with custom SVG illustrations for different CPU states and personalities.
* Mobile Responsiveness: Refine the layout and interaction behavior to provide a consistent experience across desktop and mobile devices.
* Code Refactoring: Improve naming conventions, split responsibilities into smaller modules, remove unused utilities, and make the codebase easier to understand and extend.
* Game Flow Improvements: Add a more complete round lifecycle, allowing players to start another round without relying on the current testing reset mechanism.
* Persistent Statistics: Introduce a statistics system to track wins, losses, draws, and player behavior across sessions using browser storage.

---

This project is an ongoing experiment in Vanilla JavaScript architecture and basic adaptive decision-making. The goal is to gradually evolve it into a more polished game while improving the underlying code structure and making the CPU opponent smarter.