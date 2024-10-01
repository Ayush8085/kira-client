import { axiosPrivate } from "@/api/axios";
import { selectIssues, setIssues } from "@/features/issueSlice";
import { updateIssue } from "@/services/issueAPI";
import { Loading } from "@/utils/Loading";
import React, { createContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

export const DragContext = createContext({});

export const DragProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeCard, setActiveCard] = useState(null);
    const issues = useSelector(selectIssues);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const onDrop = async (status, position) => {
        console.log(`${activeCard} is going to be placed into ${status} at position ${position}`);

        try {
            if (activeCard === null || activeCard === undefined) return;

            const issueToMove = issues[activeCard];
            const data = await updateIssue(axiosPrivate, issueToMove.id, { status });
            const updatedIssues = issues.filter((issue, index) => index !== activeCard);
            updatedIssues.splice(position, 0, {
                ...issueToMove,
                status: status,
            })
            dispatch(setIssues(updatedIssues));
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
        <DragContext.Provider value={{ activeCard, setActiveCard, onDrop }}>
            {children}
        </DragContext.Provider>
    )
}
