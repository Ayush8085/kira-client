import { CreateIssueDialog } from "@/components/CreateIssueDialog";
import { IssueColumn } from "@/components/IssueColumn";
import { Button } from "@/components/ui/button";
import { DragContext } from "@/context/DragProvider";
import { setIssues } from "@/features/issueSlice";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { getIssues } from "@/services/issueAPI";
import { Loading } from "@/utils/Loading";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export const Project = () => {
    const [isLoading, setIsLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const { activeCard } = useContext(DragContext);

    useEffect(() => {
        getIssuesHere();
    }, [dispatch]);

    const getIssuesHere = async () => {
        setIsLoading(true);
        try {
            console.log("PROEJCTID: ", projectId);
            const data = await getIssues(axiosPrivate, projectId);
            console.log("HERER: ", data);
            dispatch(setIssues(data.issues));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="m-4">
            <div className="flex justify-between m-6">
                <h1 className=""></h1>
                <CreateIssueDialog>
                    <Button className="bg-slate-500 hover:bg-slate-400">+ Create issue</Button>
                </CreateIssueDialog>
            </div>
            <div className="flex justify-evenly">
                <IssueColumn title="Todo" icon={"🎯"} status="todo" />
                <IssueColumn title="In progress" icon={"🌟"} status="inprogress" />
                <IssueColumn title="Done" icon={"✅"} status="done" />
            </div>
        </div>
    )
}
