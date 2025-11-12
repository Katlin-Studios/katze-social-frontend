import UserIcon from '@/components/ui/UserIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface UserInfo {
    displayName: string;
    username: string;
}

interface UserSlotStyle {
    bgColor?: string;
    bgGradient?: string;
    decoImg?: string;
    isRound?: boolean;
}

interface UserSlotProps {
    userInfo: UserInfo;
    slotStyle?: UserSlotStyle;
}

export default function UserSlot({ userInfo, slotStyle = {} }: UserSlotProps) {
    const { bgColor, bgGradient, decoImg, isRound } = slotStyle;

    return (
        <div
            className={`flex items-center gap-4 py-2 px-2 w-full h-full overflow-hidden ${isRound ? 'rounded-lg' : ''} hover:bg-white`}
            style={{
                backgroundColor: bgColor ?? 'transparent',
                backgroundImage: bgGradient ?? undefined,
                borderRadius: isRound ? '8px' : undefined,
            }}
        >
            {/* decorative background image */}
            {decoImg ? (
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url(${decoImg})` }}
                />
            ) : null}

            <UserIcon
                imgUrl={
                    'https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2FynDtisc3_400x400.jpg?alt=media&token=e8a05d5d-09f4-48cf-ae19-343c9c405d9a'
                }
                className="w-10 h-10 border-2 border-white rounded-full bg-center bg-cover"
            />

            <div className="flex flex-col">
                <div className="flex items-center gap-1 font-semibold">
                    <div>{userInfo.displayName}</div>
                    <MaterialIcons name="verified" size={16} color={"#35f374"} />
                </div>
                <div className="text-[var(--text-second)]">@{userInfo.username}</div>
            </div>
        </div>
    );
}