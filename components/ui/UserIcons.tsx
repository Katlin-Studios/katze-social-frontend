interface UserIconProps {
    imgUrl?: string,
}

export default function UserIcon({ imgUrl }: UserIconProps) {
    return (
        <div className="user-icon" role="img" style={{backgroundImage: `url(${imgUrl})`}}></div>
    )
}