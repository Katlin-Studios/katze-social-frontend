import ChatCard from "./ChatCard"
import SearchBar from "./SearchBar"
import SpaceCard from "./SpaceCard"

const chats = [
    {
        title: "Artist Talk",
        onlineCount: 50,
        currentActivity: "Voice Chat",
        cover: "https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2F00059-2055087321.png?alt=media&token=63164ea4-63e5-4a21-b7c2-ed92a74af4e4"
    },
    {
        title: "Anime Group!",
        onlineCount: 50,
        currentActivity: "Roleplay",
        cover: "https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2F11.png?alt=media&token=5cf469d6-8904-486c-ade3-5f46e75d24d5"
    },
    {
        title: "We Love Games!!!",
        onlineCount: 50,
        currentActivity: "Roleplay",
        cover: "https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2Fchat_banner.png?alt=media&token=b06e7eb9-660e-47cd-ad79-8594f1a53bcf"
    }
]

const spaces = [
    {
        title: "Katze Social Anime",
        onlineCount: 15,
        icon: "https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2Fsocial_media_icon.png?alt=media&token=1eefa093-4829-4d62-bece-7e3ea07c6644",
        cover: "https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2F38b842a2780c3029393dc04843c45954.jpg?alt=media&token=d5f99040-4781-4e60-9102-b3e4d9314d50"
    },
    {
        title: "Space for Cat Lovers!!! We Love Cats",
        onlineCount: 15,
        icon: "https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2Fsocials.png?alt=media&token=eb189be9-5d00-4fd1-b738-8f8043d8e530",
        cover: "https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2F-p00053-1164806123.png?alt=media&token=c0c86be8-8ecc-4dc0-aa9f-189a6973e275"
    },
    {
        title: "The Creative Hub",
        onlineCount: 15,
        icon: "https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2F1975636247331942400-v2-r736x736-s736x736.webp?alt=media&token=b25d18e1-31b3-4d80-9a1f-d8e1ea85a55d",
        cover: "https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2FsrAIDE.png?alt=media&token=562d464c-049d-45d4-ac66-84238740e38b"
    }
]

export default function InfoBar() {
    return (
        <div className="sidebar infobar">
            <SearchBar id="searchBarInput" />

            <div className="common-box">
                <h1>Discover New Chats &gt;&gt;</h1>

                <div className="display">
                    {chats.map((card, index) => (
                        <ChatCard
                            key={index}
                            title={card.title}
                            onlineCount={card.onlineCount}
                            cover={card.cover}
                            currentActivity={card.currentActivity!}
                        />
                    ))}
                </div>
            </div>

            <div className="common-box">
                <h1>Explore New Spaces &gt;&gt;</h1>

                <div className="display">
                    {spaces.map((card, index) => (
                        <SpaceCard
                            key={index}
                            title={card.title}
                            cover={card.cover}
                            icon={card.icon}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}