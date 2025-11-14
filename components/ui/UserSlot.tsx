import UserIcon from '@/components/ui/UserIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface UserInfo {
    displayName: string,
    username: string
}

interface UserSlotStyle {
    bgColor?: string,
    bgGradient?: string,
    decoImg?: string,
    isRound?: boolean | true
}

interface UserSlotProps {
    userInfo: UserInfo;
    slotStyle: UserSlotStyle;
}

export default function UserSlot({ userInfo, slotStyle }: UserSlotProps) {
    return (
        <div className="user-slot" style={{
            borderRadius: slotStyle.isRound ? "8px" : "0",
            backgroundColor: slotStyle.bgColor ? slotStyle.bgColor : "transparent",
            backgroundImage: slotStyle.bgGradient
        }}>
            <div className="user-slot-img" style={{ backgroundImage: `url(${slotStyle.decoImg})` }}></div>


            <UserIcon imgUrl='https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2FynDtisc3_400x400.jpg?alt=media&token=e8a05d5d-09f4-48cf-ae19-343c9c405d9a' />

            <div className="user-slot-info">
                <div style={{display: "flex", gap: "4px"}}>
                    <div style={{fontWeight: 600}}>{userInfo.displayName}</div>
                    <MaterialIcons name='verified' size={16} color={"#35f374"} />
                    </div>
                <div style={{color: "var(--text-second)"}}>@{userInfo.username}</div>
            </div>
        </div>
    )
}