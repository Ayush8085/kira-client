import { selectIssues, setIssues } from "@/features/issueSlice";
import React, { createContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

export const DragContext = createContext({});

export const DragProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeCard, setActiveCard] = useState(null);
    const issues = useSelector(selectIssues);
    const dispatch = useDispatch();

    const onDrop = (status, position) => {
        console.log(`${activeCard} is going to be placed into ${status} at position ${position}`);

        if (activeCard === null || activeCard === undefined) return;

        const issueToMove = issues[activeCard];
        const updatedIssues = issues.filter((issue, index) => index !== activeCard);
        updatedIssues.splice(position, 0, {
            ...issueToMove,
            status: status,
        })

        dispatch(setIssues(updatedIssues));
    }

    return (
        <DragContext.Provider value={{ activeCard, setActiveCard, onDrop }}>
            {children}
        </DragContext.Provider>
    )
}
