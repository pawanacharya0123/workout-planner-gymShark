export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("planState");
    if (serializedState === null) return undefined; // Let reducers initialize
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("planState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};
