interface ThreadContainerProps {
    displayName: string,
    username: string,
    timestamp: string,
    isUserVerified?: boolean,
    threadType?: 'common' | 'media' | 'poll' | 'audio' | 'advanced',
    textContent?: string,
}

export default function ThreadContainer({
    displayName,
    username,
    timestamp,
    isUserVerified = false,
    threadType = 'common',
    textContent = "",
}: ThreadContainerProps) {

    return(
        <div className="flex gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
            {/* avatar */}
            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
            {/* content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {displayName}
                    </span>
                    {isUserVerified && (
                        <span className="inline-flex items-center text-blue-600 bg-blue-50 dark:bg-blue-900/30 text-xs px-2 py-0.5 rounded-full">
                            ✓
                        </span>
                    )}
                    <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        @{username} · {timestamp}
                    </span>
                </div>
                <div className="mt-2 text-gray-800 dark:text-gray-200 text-sm">
                    {textContent}
                </div>
                {/* optional: thread type indicator */}
                <div className="mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {threadType}
                    </span>
                </div>
            </div>
        </div>
    )
}