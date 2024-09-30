import React from "react"
import { IssueCard } from "./IssueCard"
import { useSelector } from "react-redux"
import { selectIssues } from "@/features/issueSlice"

export const IssueColumn = ({ title, icon, status }: { title: string, icon: string, status: string }) => {
    const issues: Array<any> = useSelector(selectIssues);

    return (
        <div className="flex flex-col min-w-[300px]">
            <h1 className="text-3xl font-semibold p-4">
                {icon}
                {title}
            </h1>
            <div className="">
                {
                    issues.map((issue, index) => (
                        issue.status === status &&
                        <React.Fragment key={index}>
                            <IssueCard title={issue.title} key={issue.key} description={issue.description} />
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}
