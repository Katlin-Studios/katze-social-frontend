# 🗂️ Custom Store System
A lightweight, React-friendly state management system built with TypeScript.

This system provides a simple way to create stores, subscribe to updates, and consume state via custom hooks without external dependencies like Redux or Zustand.

---

## 📁 Project Structure

```
store/                       # Centralized stores
 └── storeFactory.ts         # Generic store creator
 └── MediaViewerStore.ts     # Example store

hooks/                       # React hooks for consuming stores
 └── useMediaViewerStore.ts  # Example store hook
```

---

## ⚙️ How It Works

- `storeFactory.ts`: Provides a generic `createStore` function.
- **Stores:** Define state shape, create a store instance, and expose actions.
- **Hooks:** Wrap store subscriptions in React hooks for easy consumption.
- **Components**: Use hooks to access state and trigger actions.

---

## 🛠️ Creating a Store

### 1. Define your state interface
```ts
interface MediaViewerStore {
  currentImageUrl?: string;
  currentThread?: ThreadData;
  showMediaViewer: boolean;
}
```

### 2. Create the store with `createStore`
```ts
import { createStore } from "./storeFactory";

const mediaViewerStore = createStore<MediaViewerStore>({
  currentImageUrl: undefined,
  currentThread: undefined,
  showMediaViewer: false,
});

export const { setState, getState, subscribe } = mediaViewerStore;
```

### 3. Add actions for clarity
```ts
export function openMediaViewer(url: string, thread: ThreadData) {
  setState({
    currentImageUrl: url,
    currentThread: thread,
    showMediaViewer: true,
  });
}

export function closeMediaViewer() {
  setState({ showMediaViewer: false });
}
```

---

## 🎣 Creating a Hook

Hooks wrap the store’s subscription logic so React components can re-render automatically when state changes.

```ts
import { useEffect, useState } from "react";
import { getState, subscribe } from "@/store/MediaViewerStore";

export function useMediaViewerStore() {
  const [state, setState] = useState(getState());

  useEffect(() => {
    const unsubscribe = subscribe(setState);
    return unsubscribe;
  }, []);

  return state;
}
```

---

## 🖼️ Using the Store in Components

```ts
import ThreadContainer from "./ThreadContainer";
import { MaterialIcons } from "@expo/vector-icons";
import { closeMediaViewer } from "@/store/MediaViewerStore";
import { useMediaViewerStore } from "@/hooks/useMediaViewerStore";

export default function MediaViewer() {
  const { currentImageUrl, currentThread } = useMediaViewerStore();

  if (!currentImageUrl || !currentThread) return null;

  return (
    <div className="media-viewer">
      <div className="display">
        <img src={currentImageUrl} />
      </div>

      <div className="thread">
        <ThreadContainer {...currentThread} />
      </div>

      <button
        onClick={() => closeMediaViewer()}
        className="close-button"
        title="Close"
      >
        <MaterialIcons name="close" size={36} color="white" />
      </button>
    </div>
  );
}
```

---

## 🚀 Benefits
- **Minimal & dependency-free:** Pure TypeScript + React.
- **Predictable state updates:** Simple `setState` merges partial updates.
- **Easy subscriptions:** Components re-render only when subscribed state changes.
- **Composable:** Create multiple stores for different domains (auth, UI, data, etc.).

---

## 📌 Best Practices

- Keep store logic (actions, state shape) inside `store/`.
- Keep React hooks inside `hooks/`.
- Always expose actions (like `openMediaViewer`) instead of calling `setState` directly in components.
- Use TypeScript interfaces to enforce state shape and prevent runtime errors.

---

## 🧩 Example Expansion

To add a new store (e.g., `AuthStore`):
- Create `store/AuthStore.ts` with state + actions.
- Create `hooks/useAuthStore.ts` to wrap subscriptions.
- Import `useAuthStore` in your components.
