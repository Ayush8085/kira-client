import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { selectProjects, setProject, setProjects } from "@/features/projectSlice";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { deleteProject, getProject, getProjectsOfUser } from "@/services/projectAPI";
import { Loading } from "@/utils/Loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
        toast.error(error as string);
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
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  }

  const deleteProjectHere = async (projectId: string) => {
    setIsLoading(true);
    try {
      await deleteProject(axiosPrivate, projectId);
      const newProjects = projects.filter((project: any) => project.project.id !== projectId);
      dispatch(setProjects(newProjects));
    } catch (error) {
      toast.error(error as string);
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
        <div className="flex justify-between m-6">
          <Input className="w-[300px]" placeholder="Search projects" />
          <CreateProjectDialog>
            <Button className="bg-slate-500 hover:bg-slate-400">+ Create project</Button>
          </CreateProjectDialog>
        </div>
        <div className="">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className=" text-slate-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">S.no</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Key</th>
                <th className="py-3 px-6 text-left">Lead</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 text-sm font-normal">
              {projects.map((item, idx) => (
                <tr key={item.id} className="border-b border-gray-200  cursor-pointer">
                  <td className="py-3 px-6 hover:underline" onClick={() => getProjectHere(item.project.id)}>{idx + 1}</td>
                  <td className="py-3 px-6 hover:underline" onClick={() => getProjectHere(item.project.id)}>{item.project.title}</td>
                  <td className="py-3 px-6 hover:underline" onClick={() => getProjectHere(item.project.id)}>{item.project.key}</td>
                  <td className="py-3 px-6 hover:underline" onClick={() => getProjectHere(item.project.id)}>{item.project.owner.username}</td>
                  <td className="py-3 px-6 hover:opacity-80" onClick={() => deleteProjectHere(item.project.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home