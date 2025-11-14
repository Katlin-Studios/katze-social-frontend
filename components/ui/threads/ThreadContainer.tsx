import { MaterialIcons } from "@expo/vector-icons"
import MediaContainer from "./MediaContainer"
import ThreadStats from "./ThreadStats"

export interface MediaContent {
    src: string,
    alt: string
}

interface ThreadContainerProps {
    displayName: string,
    username: string,
    timestamp: string,
    isUserVerified?: boolean,
    threadType?: 'common' | 'media' | 'poll' | 'audio' | 'advanced',
    textContent?: string,
    mediaContent?: MediaContent[],
    pollOptions?: string[],
    audioContent?: string,
    advancedContent?: React.ReactNode
}

export default function ThreadContainer({
    displayName,
    username,
    timestamp,
    isUserVerified = false,
    threadType = 'common',
    textContent = "",
    mediaContent,
}: ThreadContainerProps) {

    return (
        <div className="thread-container">
            {/* avatar */}
            <div role="img" className="user-icon" style={{backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2FynDtisc3_400x400.jpg?alt=media&token=e8a05d5d-09f4-48cf-ae19-343c9c405d9a)"}} />
            {/* content */}
            <div className="thread-content">
                <div className="thread-user-info">
                    <div className="thread-displayname">
                        <a href={`/${username}`} className="thread-displayname-link">
                            {displayName}
                        </a>
                        {isUserVerified && (
                            <MaterialIcons
                                name="verified"
                                color="#35f374"
                                size={16}
                            />
                        )}
                    </div>
                    <span className="thread-username">
                        @{username} · {timestamp}
                    </span>
                </div>

                <div className="thread-text-content">
                    {textContent}
                </div>

                {threadType === 'media' && <MediaContainer mediaContent={mediaContent} />}
            
                <ThreadStats />
            </div>
        </div>
    )
}