// MediaViewerStore.ts
import { createStore } from "./storeFactory";
import { ThreadData } from "@/interfaces/threads";

interface MediaViewerStore {
  currentImageUrl?: string;
  currentThread?: ThreadData;
  showMediaViewer: boolean;
}

const mediaViewerStore = createStore<MediaViewerStore>({
  currentImageUrl: undefined,
  currentThread: undefined,
  showMediaViewer: false,
});

export const { setState, getState, subscribe } = mediaViewerStore;

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