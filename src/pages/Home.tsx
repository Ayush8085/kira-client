import { selectProjects, setProject, setProjects } from "@/features/projectSlice";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { getProject, getProjectsOfUser } from "@/services/projectAPI";
import { Loading } from "@/utils/Loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects: Array<any> = useSelector(selectProjects);

  useEffect(() => {
    const getAllProjects = async () => {
      setIsLoading(true);
      try {
        const data = await getProjectsOfUser(axiosPrivate);
        dispatch(setProjects(data.projects));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    getAllProjects();
  }, [dispatch, axiosPrivate]);

  const getProjectHere = async (projectId: string) => {
    setIsLoading(true);
    try {
      const data = await getProject(axiosPrivate, projectId);
      dispatch(setProject(data.project));
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="">
      {/* NAVBAR */}
      {/* <Navbar /> */}

      {/* PROJECTS */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-slate-200 text-slate-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">S.no</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Key</th>
              <th className="py-3 px-6 text-left">Owner</th>
            </tr>
          </thead>
          <tbody className="text-slate-600 text-sm font-normal">
            {projects.map((item, idx) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-slate-100 cursor-pointer" onClick={() => getProjectHere(item.id)}>
                <td className="py-3 px-6">{idx + 1}</td>
                <td className="py-3 px-6">{item.title}</td>
                <td className="py-3 px-6">{item.key}</td>
                <td className="py-3 px-6">{item.owner.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home