import { useEffect, useMemo, useRef, useState } from "react";
import {
  dispatchUiAction,
  getUiState,
  subscribeUiState,
} from "../gameUiBridge";
import "./GameControlPanel.css";

function formatMoney(value) {
  return `$${Number(value).toFixed(2)}`;
}

function formatNumber(value) {
  return Number(value).toFixed(2);
}

export function GameControlPanel() {
  const [state, setState] = useState(getUiState());
  const [betInput, setBetInput] = useState(String(getUiState().bet));
  const [isDifficultyMenuOpen, setIsDifficultyMenuOpen] = useState(false);
  const difficultyMenuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = subscribeUiState((nextState) => {
      setState(nextState);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setBetInput(String(state.bet));
  }, [state.bet]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!difficultyMenuRef.current) {
        return;
      }

      if (!difficultyMenuRef.current.contains(event.target)) {
        setIsDifficultyMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  const canAdjustBet = state.gameState === "waiting";
  const canStart = state.startVisible && state.gameState === "waiting";
  const canCollect = state.collectEnabled;

  const difficultyLabel = useMemo(() => {
    return state.difficulty || "EASY";
  }, [state.difficulty]);

  const showCollect = state.gameState !== "waiting";
  const difficulties = ["EASY", "MEDIUM", "HARD"];

  const difficultyDisplayName = useMemo(() => {
    return difficultyLabel.charAt(0) + difficultyLabel.slice(1).toLowerCase();
  }, [difficultyLabel]);

  const commitBetInput = () => {
    const parsedValue = Number.parseFloat(betInput);

    if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
      setBetInput(String(state.bet));
      return;
    }

    const normalizedBet = Math.round(parsedValue * 100) / 100;

    dispatchUiAction("SET_BET", normalizedBet);
  };

  return (
    <div className="game-ui-overlay">
      <div className="game-hud-top">
        <div className="hud-chip-row">
          <div className="hud-chip">
            <span className="hud-chip-label">Current Win</span>
            <span className="hud-chip-value hud-chip-value-win">
              {formatMoney(state.currentWin)}
            </span>
          </div>
          <div className="hud-chip">
            <span className="hud-chip-label">Multiplier</span>
            <span className="hud-chip-value hud-chip-value-win">
              x{Number(state.multiplier).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="balance-pill">
          <span className="balance-pill-label">Balance</span>
          <span className="balance-pill-value">{formatMoney(state.balance)}</span>
        </div>
      </div>

      <div className="game-controls-dock">
        <div className="game-controls-main">
          <div className="bet-block">
            <div className="bet-block-title">Bet</div>
            <div className="bet-adjust-row">
              <button
                className="btn btn-secondary"
                disabled={!canAdjustBet}
                onClick={() => dispatchUiAction("DECREASE_BET")}
              >
                -
              </button>
              <input
                className="bet-value-input"
                type="number"
                min="0.01"
                step="0.01"
                inputMode="decimal"
                disabled={!canAdjustBet}
                value={betInput}
                onChange={(event) => setBetInput(event.target.value)}
                onBlur={commitBetInput}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    commitBetInput();
                    event.currentTarget.blur();
                  }
                }}
              />
              <button
                className="btn btn-secondary"
                disabled={!canAdjustBet}
                onClick={() => dispatchUiAction("INCREASE_BET")}
              >
                +
              </button>
            </div>
            <div className="bet-presets-row">
              {state.betPresets.map((preset) => (
                <button
                  key={preset}
                  className={`chip ${Number(state.bet) === Number(preset) ? "chip-active" : ""}`}
                  disabled={!canAdjustBet}
                  onClick={() => dispatchUiAction("BET_PRESET", preset)}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="difficulty-panel">
            <div className="difficulty-meta-row">
              <span className="difficulty-meta-label">Difficulty</span>
              <span className="difficulty-meta-hint">Chance of being shot down</span>
            </div>

            <div className="difficulty-segmented">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  className={`difficulty-chip ${difficultyLabel === difficulty ? "difficulty-chip-active" : ""}`}
                  disabled={!canAdjustBet}
                  onClick={() => dispatchUiAction("SET_DIFFICULTY", difficulty)}
                >
                  {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            <div className="difficulty-custom" ref={difficultyMenuRef}>
              <button
                className="difficulty-custom-trigger"
                disabled={!canAdjustBet}
                onClick={() => setIsDifficultyMenuOpen((open) => !open)}
              >
                <span className="difficulty-custom-value">{difficultyDisplayName}</span>
                <span className={`difficulty-custom-arrow ${isDifficultyMenuOpen ? "is-open" : ""}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
                  </svg>
                </span>
              </button>

              {isDifficultyMenuOpen && canAdjustBet && (
                <div className="difficulty-custom-menu">
                  {difficulties.map((difficulty) => {
                    const label = difficulty.charAt(0) + difficulty.slice(1).toLowerCase();
                    const isActive = difficultyLabel === difficulty;

                    return (
                      <button
                        key={difficulty}
                        className={`difficulty-custom-option ${isActive ? "is-active" : ""}`}
                        onClick={() => {
                          dispatchUiAction("SET_DIFFICULTY", difficulty);
                          setIsDifficultyMenuOpen(false);
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="actions-panel">
            <div className={`control-actions-row ${showCollect ? "control-actions-split" : "control-actions-single"}`}>
              {showCollect && (
                <button
                  className="btn btn-gold btn-collect"
                  disabled={!canCollect}
                  onClick={() => dispatchUiAction("COLLECT")}
                >
                  <span className="collect-label">Collect</span>
                  <span className="collect-win-number">{formatNumber(state.currentWin)}</span>
                </button>
              )}

              <button
                className="btn btn-green"
                disabled={!canStart}
                onClick={() => dispatchUiAction("START")}
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
