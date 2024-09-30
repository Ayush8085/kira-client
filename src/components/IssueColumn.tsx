import React, { useContext } from "react"
import { IssueCard } from "./IssueCard"
import { useSelector } from "react-redux"
import { selectIssues } from "@/features/issueSlice"
import { DropArea } from "./DropArea"
import { DragContext } from "@/context/DragProvider"

export const IssueColumn = ({ title, icon, status }: { title: string, icon: string, status: string }) => {
    const issues: Array<any> = useSelector(selectIssues);
    const { onDrop } = useContext(DragContext);

    return (
        <div className="flex flex-col min-w-[300px]">
            <h1 className="text-3xl font-semibold p-4">
                {icon}
                {title}
            </h1>
            <div className="">
                <DropArea onDrop={() => onDrop(status, 0)} />
                {
                    issues.map((issue, index) => (
                        issue.status === status &&
                        <React.Fragment key={index}>
                            <IssueCard title={issue.title} index={index} description={issue.description} />
                            <DropArea onDrop={() => onDrop(status, index + 1)} />
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}
