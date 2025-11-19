export type Subscriber<T> = (state: T) => void;

export function createStore<T>(initialState: T) {
  let state = initialState;
  const subscribers: Subscriber<T>[] = [];

  function setState(partial: Partial<T>) {
    state = { ...state, ...partial };
    notify();
  }

  function getState(): T {
    return state;
  }

  function subscribe(callback: Subscriber<T>) {
    subscribers.push(callback);
    return () => {
      const index = subscribers.indexOf(callback);
      if (index > -1) subscribers.splice(index, 1);
    };
  }

  function notify() {
    subscribers.forEach(cb => cb(state));
  }

  return { setState, getState, subscribe };
}