import { MaterialIcons } from "@expo/vector-icons";

interface SearchBarProps {
    id: string,
    placeholder?: string,
    name?: string,
    type?: string
}

export default function SearchBar({
    id,
    placeholder = "Search in Katze",
    name = "search",
    type = "text",
}: SearchBarProps) {
    return (
        <div className="searchbar">
            <MaterialIcons name="search" size={24} color="white" />

            <input
            id={id}
            title={placeholder}
            type={type}
            name={name}
            placeholder={placeholder}
        />
        </div>
    );
}
