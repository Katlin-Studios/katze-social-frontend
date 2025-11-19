import ThreadContainer from "./ThreadContainer"
import { MaterialIcons } from "@expo/vector-icons"
import { closeMediaViewer } from "@/store/MediaViewerStore"
import { useMediaViewerStore } from "@/hooks/useMediaViewerStore"

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

            <button onClick={() => closeMediaViewer()} className="close-button" title="Close">
                <MaterialIcons name="close" size={36} color="white" />
            </button>
        </div>
    )
}