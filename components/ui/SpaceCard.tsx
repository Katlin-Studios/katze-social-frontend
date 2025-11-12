
interface SpaceCardProps {
    cover: string,
    title: string,
    icon: string,
    onlineCount: number
}

export default function SpaceCard({ cover, title, icon, onlineCount }: SpaceCardProps) {
    return (
        <div className="flex flex-col gap-2 grow minw-0 cursor-pointer hover:scale-[1.025] transition duration-300 ease-in-out" style={{maxWidth: "calc((100% / 3) - var(--num-measure))"}} title={title + " Space"}>
            <div className="object-cover w-full rounded-lg overflow-hidden" role="img" style={{ backgroundImage: `url(${cover})`, aspectRatio: "6/7" }}>
                <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: "linear-gradient(to top, #000000bf, #00000000 40%)"}} ></div>

                <div role="img" className="absolute top-1 left-1 w-9 h-9 rounded-md shadow-lg shadow-black" style={{backgroundImage: `url(${icon})`}}></div>

                <div className="absolute bottom-0 left-0 flex items-center gap-2 px-1 py-1 font-bold text-xs">
                    <div className="online-badge"></div>
                    {onlineCount} online
                </div>
            </div>

            <h1 style={{display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden"}} >{title}</h1>
        </div>
    )
}