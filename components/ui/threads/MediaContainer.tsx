import { MediaContent } from "./ThreadContainer"

interface MediaContainerProps {
    mediaContent: MediaContent[] | undefined,
}

export default function MediaContainer({ mediaContent }: MediaContainerProps) {
    return (
        <div className="thread-media-content"
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
                    <a href={mediaContent![0].src} target="_blank" rel="noopener noreferrer">
                        <div role="img" className="placeholder" style={{ backgroundImage: `url(${mediaContent![0].src})` }}></div>
                        <img src={mediaContent![0].src} alt={mediaContent![0].alt} />
                    </a>

                    {mediaContent?.length! >= 3 && (
                        <a href={mediaContent![2].src} target="_blank" rel="noopener noreferrer">
                            <div role="img" className="placeholder" style={{ backgroundImage: `url(${mediaContent![2].src})` }}></div>
                            <img src={mediaContent![2].src} alt={mediaContent![2].alt} />
                        </a>
                    )}
                </div>
            )}

            {mediaContent?.length! >= 2 && (
                <div className="thread-media-col">
                    {mediaContent?.length! >= 2 && (
                        <a href={mediaContent![1].src} target="_blank" rel="noopener noreferrer">
                            <div role="img" className="placeholder" style={{ backgroundImage: `url(${mediaContent![1].src})` }}></div>
                            <img src={mediaContent![1].src} alt={mediaContent![1].alt} />
                        </a>
                    )}

                    {mediaContent?.length! === 4 && (
                        <a href={mediaContent![3].src} target="_blank" rel="noopener noreferrer">
                            <div role="img" className="placeholder" style={{ backgroundImage: `url(${mediaContent![3].src})` }}></div>
                            <img src={mediaContent![3].src} alt={mediaContent![3].alt} />
                        </a>
                    )}
                </div>
            )}
        </div>
    )
}