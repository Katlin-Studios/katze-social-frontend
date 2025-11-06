import { MaterialIcons } from "@expo/vector-icons"

interface HeaderButtonProps {
    id: string,
    title: string,
    icon: string,
    hasNews?: boolean | false
}

export default function HeaderButton({ id, title, icon, hasNews }: HeaderButtonProps) {
    return (
        <button id={id} title={title}>
            <div style={{ display: hasNews ? "flex" : "none", position: "absolute", top: 0, right: 0, width: "8px", height: "8px", backgroundColor: "red", borderRadius: "50%" }}></div>

            <MaterialIcons name={icon} size={24} color={"white"} />
        </button>
    )
}