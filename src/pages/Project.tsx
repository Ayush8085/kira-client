import { CreateIssueDialog } from "@/components/CreateIssueDialog";
import { IssueColumn } from "@/components/IssueColumn";
import { Button } from "@/components/ui/button";

export const Project = () => {

    return (
        <div className="m-4">
            <div className="flex justify-between m-6">
                <h1 className="text-2xl">Issues</h1>
                <CreateIssueDialog>
                    <Button className="bg-slate-500 hover:bg-slate-400">+ Create issue</Button>
                </CreateIssueDialog>
            </div>
            <div className="flex justify-evenly">
                <IssueColumn title="Todo" icon={"🎯"} />
                <IssueColumn title="In progress" icon={"🌟"} />
                <IssueColumn title="Done" icon={"✅"} />
            </div>
        </div>
    )
}
