import { DragContext } from "@/context/DragProvider"
import { useContext, useEffect } from "react"
import { IssueDialog } from "./IssueDialog";
import { selectIssues, setIssue } from "@/features/issueSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { getComments } from "@/services/commentAPI";
import { setComments } from "@/features/commentSlice";

export const IssueCard = ({ title, index, description, issueId }: { title: string, index: number, description: string, issueId: string }) => {
    const { setActiveCard } = useContext(DragContext);

    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const issues = useSelector(selectIssues);

    useEffect(() => {
        getIssueHere();
    }, [dispatch, axiosPrivate]);

    const getIssueHere = async () => {
        dispatch(setIssue(issues[index]));
    }

    const getCommentsHere = async () => {
        const data = await getComments(axiosPrivate, issues[index].id);
        dispatch(setComments(data.comments));
    }

    return (
        <IssueDialog >
            <article
                onClick={() => { getIssueHere(), getCommentsHere() }}
                draggable
                onDragStart={() => setActiveCard(index)}
                onDragEnd={() => setActiveCard(null)}
                className="w-full min-h-[80px] border-2 rounded-xl  cursor-grab active:opacity-70 active:border-slate-700 p-4"
            >
                <p className="text-xl">{title}</p>
            </article>
        </IssueDialog>
    )
}

