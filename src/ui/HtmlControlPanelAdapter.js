import { Container } from "pixi.js";
import { patchUiState, subscribeUiActions } from "./gameUiBridge";

export class HtmlControlPanelAdapter extends Container {
  constructor(initialState) {
    super();

    this.state = initialState;

    this.unsubscribeActions = subscribeUiActions((action) => {
      this.handleUiAction(action);
    });
  }

  handleUiAction(action) {
    switch (action.type) {
      case "START":
        if (this.startCallback) this.startCallback();
        break;
      case "COLLECT":
        if (this.collectCallback) this.collectCallback();
        break;
      case "INCREASE_BET":
        if (this.increaseBetCallback) this.increaseBetCallback();
        break;
      case "DECREASE_BET":
        if (this.decreaseBetCallback) this.decreaseBetCallback();
        break;
      case "BET_PRESET":
        if (this.betPresetCallback) this.betPresetCallback(action.payload);
        break;
      case "NEXT_DIFFICULTY":
        if (this.difficultyCallback) this.difficultyCallback();
        break;
      case "SET_DIFFICULTY":
        if (this.setDifficultyCallback) {
          this.setDifficultyCallback(action.payload);
        }
        break;
      case "SET_BET":
        if (this.setBetCallback) {
          this.setBetCallback(action.payload);
        }
        break;
      default:
        break;
    }
  }

  setOnStart(callback) {
    this.startCallback = callback;
  }

  setOnCollect(callback) {
    this.collectCallback = callback;
  }

  setOnIncreaseBet(callback) {
    this.increaseBetCallback = callback;
  }

  setOnDecreaseBet(callback) {
    this.decreaseBetCallback = callback;
  }

  setOnBetPreset(callback) {
    this.betPresetCallback = callback;
  }

  setOnDifficulty(callback) {
    this.difficultyCallback = callback;
  }

  setOnSetDifficulty(callback) {
    this.setDifficultyCallback = callback;
  }

  setOnSetBet(callback) {
    this.setBetCallback = callback;
  }

  setBalance(balance) {
    patchUiState({ balance: Number(balance) });
  }

  setBet(bet) {
    patchUiState({ bet: Number(bet) });
  }

  setBetValue(value) {
    patchUiState({ bet: Number(value) });
  }

  setCurrentWin(amount) {
    patchUiState({ currentWin: Number(amount) });
  }

  setMultiplier(multiplier) {
    patchUiState({ multiplier: Number(multiplier) });
  }

  setDifficulty(difficulty) {
    patchUiState({ difficulty });
  }

  setState(state) {
    this.state = state;
    patchUiState({ gameState: state });
  }

  hideStartButton() {
    patchUiState({ startVisible: false });
  }

  showStartButton() {
    patchUiState({ startVisible: true });
  }

  showCollectButton() {
    patchUiState({ collectEnabled: true });
  }

  hideCollectButton() {
    patchUiState({ collectEnabled: false });
  }

  setCollectEnabled(enabled) {
    patchUiState({ collectEnabled: Boolean(enabled) });
  }

  setBetPresets(values) {
    patchUiState({ betPresets: values.slice() });
  }

  applyResponsiveLayout() {}

  destroyAdapter() {
    if (this.unsubscribeActions) {
      this.unsubscribeActions();
      this.unsubscribeActions = null;
    }
  }
}
