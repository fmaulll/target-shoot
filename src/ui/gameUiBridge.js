const uiEventTarget = new EventTarget();

const uiState = {
  balance: 1000,
  bet: 10,
  currentWin: 0,
  multiplier: 1,
  difficulty: "EASY",
  gameState: "waiting",
  startVisible: true,
  collectEnabled: false,
  betPresets: [10, 20, 50, 100, 200],
};

export function getUiState() {
  return { ...uiState };
}

export function patchUiState(patch) {
  Object.assign(uiState, patch);

  uiEventTarget.dispatchEvent(
    new CustomEvent("ui-state", {
      detail: getUiState(),
    })
  );
}

export function subscribeUiState(handler) {
  const listener = (event) => {
    handler(event.detail);
  };

  uiEventTarget.addEventListener("ui-state", listener);

  return () => {
    uiEventTarget.removeEventListener("ui-state", listener);
  };
}

export function dispatchUiAction(type, payload) {
  uiEventTarget.dispatchEvent(
    new CustomEvent("ui-action", {
      detail: { type, payload },
    })
  );
}

export function subscribeUiActions(handler) {
  const listener = (event) => {
    handler(event.detail);
  };

  uiEventTarget.addEventListener("ui-action", listener);

  return () => {
    uiEventTarget.removeEventListener("ui-action", listener);
  };
}
