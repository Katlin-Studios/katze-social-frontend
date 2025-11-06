import { MaterialIcons } from "@expo/vector-icons";

interface ChatCardProps {
    cover: string,
    title: string,
    onlineCount: number,
    currentActivity?: string
}

export default function ChatCard({ cover, title, onlineCount, currentActivity }: ChatCardProps) {
    const icons: Record<string, string> = {
        "Voice Chat": "multitrack-audio",
        "Music Room": "audiotrack",
        "Video Room": "ondemand-video",
        "Roleplay": "theater-comedy"
    };


    return (
        <div className="ch-sp-card" title={title + " Chat"}>
            <div className="ch-cover" role="img" style={{ backgroundImage: `url(${cover})` }}>
                <div className="dark-gradient"></div>

                <div className="activity">
                    {currentActivity &&
                        <MaterialIcons
                            name={icons[currentActivity] || "help"}
                            color="white"
                            size={16}
                        />}
                </div>

                <div className="online-count">
                    <div className="online-badge"></div>
                    {onlineCount} online
                </div>
            </div>

            <h1>{title}</h1>
        </div>
    )
}