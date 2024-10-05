import { Input } from "@/components/ui/input"
import { UserCard } from "@/components/UserCard"
import { selectOtherUsers, selectProject, selectProjectUsers, setOtherUsers, setProjectUsers } from "@/features/projectSlice"
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate"
import { getProjectUsers } from "@/services/projectAPI"
import { Loading } from "@/utils/Loading"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const project = useSelector(selectProject);
  const projectUsers = useSelector(selectProjectUsers);
  const otherUsers = useSelector(selectOtherUsers);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!project) return;
    getProjectUsersHere();
  }, [project]);

  const getProjectUsersHere = async () => {
    setIsLoading(true);
    try {
      const data = await getProjectUsers(axiosPrivate, project.id);
      console.log("DATA: ", data);
      dispatch(setProjectUsers(data.project_users));
      dispatch(setOtherUsers(data.other_users));
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
    <section className="w-full h-full">

      <div className="project_users w-full max-h-[45%] p-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Project Users</h2>
          <Input className="max-w-[300px]" placeholder="Search" />
        </div>

        <div className="users grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8 m-4">
          {projectUsers && projectUsers.map((user) => (
            <UserCard key={user.user.id} user={user.user} userRole={user.role} />
          ))}
        </div>
      </div>

      <hr />

      {/* OTHER USERS */}
      <div className="other_users w-full max-h-[45%] p-4">

        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Other Users</h2>
          <Input className="max-w-[300px]" placeholder="Search" />
        </div>

        <div className="users grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8 m-4">
          {otherUsers && otherUsers.map((user) => (
            <UserCard key={user.id} user={user} userRole="other" />
          ))}
        </div>
      </div>
    </section>
  )
}
