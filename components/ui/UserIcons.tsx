interface UserIconProps {
    imgUrl?: string;
    className?: string;
    style?: any;
}

export default function UserIcon({ imgUrl, className, style }: UserIconProps) {
    return (
        <div
            className={className ?? 'user-icon bg-center bg-cover'}
            role="img"
            style={{ backgroundImage: `url(${imgUrl})`, ...(style || {}) }}
        ></div>
    );
}