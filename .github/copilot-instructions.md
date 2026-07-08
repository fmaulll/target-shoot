# Copilot Instructions for target-shoot

## Project Snapshot
- This is a PixiJS + Vite browser game with a single active scene (`GameplayScene`) and a fixed virtual resolution of `1600x900`.
- Runtime entry is `src/main.js`: initialize Pixi `Application`, apply CSS-style canvas scaling/centering, load assets, then start `Game`.
- `Game` (`src/game/Game.js`) only mounts `GameplayScene` and forwards `app.ticker` updates.

## Architecture and Data Flow
- `GameplayScene` (`src/scenes/GameplayScene.js`) is the orchestration layer. Keep core game flow here.
- Scene composition:
  - `TargetManager` creates/selects targets and emits selected target id.
  - `ControlPanel` owns UI buttons/labels and exposes callback setters (`setOnStart`, `setOnCollect`, etc.).
  - `RoundManager` resolves win/loss and streak/multiplier using a provider (`LocalResultProvider`).
  - `GameData` manages wallet state (`balance`, `bet`, `currentWin`).
- Round flow:
  1. Start -> validate funds (`gameData.canPlay()`), place bet, call `roundManager.start(difficulty)`, state `PLAYING`.
  2. Target click -> state `SHOOTING`, gun interpolates to target.
  3. Auto-shot when gun reaches target -> `roundManager.shoot(id)`.
  4. Win: update `currentWin`, show collect button, continue round. Loss: return to waiting.

## State and Behavior Conventions
- Game states are string constants in `src/game/GameState.js`: `WAITING`, `PLAYING`, `SHOOTING`, `RESULT`.
- Always gate player interactions by state (see `GameplayScene.setGameState` and bet/difficulty handlers).
- Target interaction is callback-driven:
  - `Target` exposes `setOnClick`.
  - `TargetManager` forwards via `setOnTargetSelected`.
  - `GameplayScene.selectTarget` owns selection side effects.
- Difficulty is object-based (`src/game/Difficulty.js`) with `{ targets, multiplierTable }`; UI cycles through EASY/MEDIUM/HARD.

## Result System Notes
- `LocalResultProvider.getResult(difficulty, streak, selectedTarget)` is the active resolver.
- Win chance is table-driven by `difficulty.targets` and decreases with streak.
- On win, `winningTarget` is the selected target; on loss, provider chooses a different target.
- `ResultProvider` is currently an abstract stub and is not yet enforced as a base class.

## Assets and Rendering
- Register/load all aliases in `src/managers/AssetManager.js` before creating scene objects.
- Sprites rely on aliases (`background`, `target`, `gun`, `crosshair`); avoid hardcoded file paths outside `AssetManager`.
- Use `Screen`/`GameConfig` (`src/utils/Screen.js`, `src/utils/GameConfig.js`) instead of scattering magic dimensions.

## Developer Workflow
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`
- There is no test script configured in `package.json`; validate gameplay manually in the browser.

## Known Codebase Quirks (Preserve Unless Intentionally Refactoring)
- Some classes are currently unused or partially wired (`BetManager`, `HUD`, `DifficultySelector`, `Round`, `ResultProvider`).
- `ControlPanel` uses both `setBet` (label text) and `setBetValue` (numeric center text); update both when changing bet UI behavior.
- `GameplayScene` currently keeps betting logic locally (`betValues`/`betIndex`) even though `BetManager` exists.
