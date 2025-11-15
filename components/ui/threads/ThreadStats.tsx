import { MaterialIcons } from "@expo/vector-icons"

interface ThreadStatsProps {
    likes?: number,
    reactions?: object[],
    weaves?: number,
    comments?: object[],
    bookmarks?: number,
}

export default function ThreadStats({
    likes = 0,
    reactions = [],
    weaves = 0,
    comments = [],
    bookmarks = 0,
}: ThreadStatsProps) {
    return (
        <div className="thread-stats">
            <button title="Like">
                <MaterialIcons name="favorite-outline" size={18} color="white" />
                <span>{likes}</span>
            </button>

            <button title="React">
                <MaterialIcons name="add-reaction" size={18} color="white" />
                <span>{reactions.length}</span>
            </button>

            <button title="Weave">
                <MaterialIcons name="route" size={18} color="white" />
                <span>{weaves}</span>
            </button>

            <button title="Comment">
                <MaterialIcons name="comment" size={18} color="white" />
                <span>{comments.length}</span>
            </button>

            <button title="Bookmark">
                <MaterialIcons name="bookmark-border" size={18} color="white" />
                <span>{bookmarks}</span>
            </button>

            <button title="Share">
                <MaterialIcons name="ios-share" size={18} color="white" />
            </button>
        </div>
    )
}