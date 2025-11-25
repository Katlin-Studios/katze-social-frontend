import { MaterialIcons } from "@expo/vector-icons";

interface SideBarButtonProps {
    title: string,
    icon: string,
    isAddThread?: boolean | false
}

export default function SideBarButton({ title, icon, isAddThread }: SideBarButtonProps) {
    const name = title
        .replace("_", " ")
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const id = name.replace(" ", "").slice(0, 1).toLowerCase() + name.replace(" ", "").slice(1);

    return (
        <button id={id + "SideBarButton"} title={name} className={isAddThread && "main-button" || undefined}>
            <MaterialIcons name={icon as keyof typeof MaterialIcons.glyphMap} size={24} color="white" />
            <span className="button-title">{name}</span>
        </button>
    )
}