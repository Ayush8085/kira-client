import { IssueCard } from "./IssueCard"

export const IssueColumn = ({ title, icon }: { title: string, icon: string }) => {
    return (
        <div className=" flex flex-col justify-center min-w-[300px]">
            <h1 className="text-3xl font-semibold p-4">
                {icon}
                {title}
            </h1>
            <div className="">
                <IssueCard />
                <IssueCard />
                <IssueCard />
                <IssueCard />
                <IssueCard />
            </div>
        </div>
    )
}
