import { MaterialIcons } from "@expo/vector-icons"

interface ThreadStatsProps {
    likes?: number,
    reactions?: number,
    weaves?: number,
    comments?: number,
    bookmarks?: number,
    shares?: number,
}

export default function ThreadStats({
    likes = 0,
    reactions = 0,
    weaves = 0,
    comments = 0,
    bookmarks = 0,
    shares = 0
}: ThreadStatsProps) {
    return (
        <div className="thread-stats">
            <button title="Like">
                <MaterialIcons name="favorite-outline" size={18} color="white" />
                <span>{likes}</span>
            </button>

            <button title="React">
                <MaterialIcons name="add-reaction" size={18} color="white" />
                <span>{reactions}</span>
            </button>

            <button title="Weave">
                <MaterialIcons name="route" size={18} color="white" />
                <span>{weaves}</span>
            </button>

            <button title="Comment">
                <MaterialIcons name="comment" size={18} color="white" />
                <span>{comments}</span>
            </button>

            <button title="Bookmark">
                <MaterialIcons name="bookmark-border" size={18} color="white" />
                <span>{reactions}</span>
            </button>

            <button title="Share">
                <MaterialIcons name="ios-share" size={18} color="white" />
            </button>
        </div>
    )
}