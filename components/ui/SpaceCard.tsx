
interface SpaceCardProps {
    cover: string,
    title: string,
    icon: string,
    onlineCount: number
}

export default function SpaceCard({ cover, title, icon, onlineCount }: SpaceCardProps) {
    return (
        <div className="ch-sp-card" title={title + " Space"}>
            <div className="sp-cover" role="img" style={{ backgroundImage: `url(${cover})` }}>
                <div className="dark-gradient"></div>

                <div role="img" className="card-icon" style={{backgroundImage: `url(${icon})`}}></div>

                <div className="online-count">
                    <div className="online-badge"></div>
                    {onlineCount} online
                </div>
            </div>

            <h1>{title}</h1>
        </div>
    )
}