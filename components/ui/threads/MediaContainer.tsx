import { MediaContent, ThreadData } from "@/interfaces/threads"
import { openMediaViewer } from "@/store/MediaViewerStore"

interface MediaContainerProps {
  mediaContent: MediaContent[] | undefined;
  thread: ThreadData;
}


export default function MediaContainer({ mediaContent, thread }: MediaContainerProps) {
    return (
        <div className="thread-media-content" tabIndex={0}
            style={{
                aspectRatio:
                    mediaContent?.length === 1
                        ? "1 / 1"
                        : mediaContent?.length === 2
                            ? '4 / 1'
                            : '2 / 1',

            }}>
            {mediaContent?.length! >= 1 && (
                <div className="thread-media-col">
                    <div>
                        <div role="img" className="placeholder" style={{ backgroundImage: `url(${mediaContent![0].src})` }}></div>
                        <img src={mediaContent![0].src} alt={mediaContent![0].alt} onClick={() => openMediaViewer(mediaContent![0].src, thread)} />
                    </div>

                    {mediaContent?.length! >= 3 && (
                        <div>
                            <div role="img" className="placeholder" style={{ backgroundImage: `url(${mediaContent![2].src})` }}></div>
                            <img src={mediaContent![2].src} alt={mediaContent![2].alt} onClick={() => openMediaViewer(mediaContent![2].src, thread)} />
                        </div>
                    )}
                </div>
            )}

            {mediaContent?.length! >= 2 && (
                <div className="thread-media-col">
                    {mediaContent?.length! >= 2 && (
                        <div>
                            <div role="img" className="placeholder" style={{ backgroundImage: `url(${mediaContent![1].src})` }}></div>
                            <img src={mediaContent![1].src} alt={mediaContent![1].alt} onClick={() => openMediaViewer(mediaContent![1].src, thread)} />
                        </div>
                    )}

                    {mediaContent?.length! === 4 && (
                        <div>
                            <div role="img" className="placeholder" style={{ backgroundImage: `url(${mediaContent![3].src})` }}></div>
                            <img src={mediaContent![3].src} alt={mediaContent![3].alt} onClick={() => openMediaViewer(mediaContent![3].src, thread)} />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}