import HeaderButton from "@/components/ui/HeaderButton"
import UserSlot from "@/components/ui/UserSlot"

export default function HeaderExplore() {
    return (
        <div className="header explore">
            <UserSlot userInfo={{ displayName: "SadGabi", username: "sadgabi20" }} slotStyle={{ isRound: false }} />

            <div className="header-buttons">
                <HeaderButton id="headerSearchButton" title="Search" icon="search"/>
                <HeaderButton id="headerNewsButtons" title="News" icon="newspaper" hasNews />
                <HeaderButton id="notificationsNewsButtons" title="Notifications" icon="notifications" hasNews />
            </div>
        </div>
    )
}