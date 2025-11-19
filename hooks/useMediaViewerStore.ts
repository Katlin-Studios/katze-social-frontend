// useMediaViewerStore.ts
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