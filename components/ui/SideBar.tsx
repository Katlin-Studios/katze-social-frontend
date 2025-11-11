import SideBarButton from "./SideBarButton"
import UserSlot from "./UserSlot"

export default function SideBar() {
    const sideBarButtons = [
        { title: "explore", icon: "explore" },
        { title: "spaces", icon: "apps" },
        { title: "marketplace", icon: "store" },
        { title: "chats", icon: "chat" },
        { title: "notifications", icon: "notifications" },
        { title: "saved", icon: "bookmark" },
        { title: "settings", icon: "settings" },
        { title: "help", icon: "help" },
        { title: "katze_premium", icon: "auto-awesome" },
        { title: "more", icon: "more-vert" }
    ]

    return (
        <div className="sidebar">
            <div 
                role="img" 
                style={{
                    position: "static",
                    width: "112px", 
                    height: "41px", 
                    backgroundImage: "url(./sidebar_logo.png)",
                }}
            ></div>
            
            <div className="sidebar-buttons">
                {sideBarButtons.map((button, index) => (
                    <SideBarButton title={button.title} icon={button.icon} key={index} />
                ))}
            </div>

            <div className="sidebar-buttons" style={{ flexGrow: 1, alignItems: "center", justifyContent: "end" }}>
                <SideBarButton title="add_thread" icon="library-add" isAddThread />
                
                <div title="Profile" style={{height: "calc(var(--num-measure) * 8)", width: "-webkit-fill-available", cursor: "pointer"}}>
                    <UserSlot userInfo={{displayName: "SadGabi", username: "sadgabi20"}} slotStyle={{isRound: true}} />
                </div>
            </div>
        </div>)
}