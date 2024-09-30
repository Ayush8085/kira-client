import { DragContext } from "@/context/DragProvider"
import { useContext } from "react"

export const IssueCard = ({ title, index, description }: { title: string, index: number, description: string }) => {
    const { setActiveCard } = useContext(DragContext);

    return (
        <article
            draggable
            onDragStart={() => setActiveCard(index)}
            onDragEnd={() => setActiveCard(null)}
            className="w-full min-h-[80px] border-2 rounded-xl  cursor-grab active:opacity-70 active:border-slate-700 p-4"
        >
            <p className="text-xl">{title}</p>
        </article>
    )
}

