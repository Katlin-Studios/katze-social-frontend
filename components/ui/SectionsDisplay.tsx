interface section {
    id: string,
    title: string,
    isActive?: boolean | false
}

interface SectionsDisplayProps {
    sections: section[]
}

export default function SectionsDisplay({sections}: SectionsDisplayProps) {
    return(
        <div className="sections-display">
            {sections.map((section, index) => (
                <div id={section.id} key={index} style={{color: section.isActive && "var(--text-main)"}}>
                    {section.title}

                    <div style={{display: section.isActive ? "flex" : "none" ,position: "absolute", bottom: 0, width: "-webkit-fill-available", height: "4px", backgroundColor: "var(--accent-4)"}}></div>
                </div>
            ))}
        </div>
    )
}