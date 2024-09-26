import { selectProject } from "@/features/projectSlice";
import { useSelector } from "react-redux";

export const Project = () => {
    const project = useSelector(selectProject);

    return (
        <div>
            <h1>{project.title}</h1>
        </div>
    )
}
