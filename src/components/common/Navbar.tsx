import { Link } from "react-router-dom";
import { ProfileDowndown } from "../ProfileDropdown";
import { useSelector } from "react-redux";
import { selectProject } from "@/features/projectSlice";

export const Navbar = () => {
  const project = useSelector(selectProject);

  return (
    <nav className="bg-slate-500 p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/" className="text-slate-200 hover:text-gray-300">Home</Link>
        {project && <Link to={`/projects/${project.id}`} className="text-slate-200 hover:text-gray-300">Issues</Link>}
        {project && <Link to="/users" className="text-slate-200 hover:text-gray-300">Users</Link>}
      </div>
      <div className="flex items-center gap-4">
        <ProfileDowndown>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 cursor-pointer text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </ProfileDowndown>
      </div>
    </nav>
  );
};