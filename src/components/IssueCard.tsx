
export const IssueCard = ({ title, key, description }: { title: string, key: string, description: string | null }) => {
    return (
        <article className="w-full min-h-[80px] border-2 rounded-xl my-4 cursor-grab active:opacity-70 active:border-slate-700 p-4" draggable>
            <p className="text-xl">{title}</p>
        </article>
    )
}

