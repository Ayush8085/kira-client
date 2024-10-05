import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { useDispatch, useSelector } from "react-redux"
import { selectProject, setOtherUsers, setProjectUsers } from "@/features/projectSlice"
import { changeRole } from "@/services/projectAPI"
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate"

export const UserCard = ({ user, userRole }: { user: any, userRole: string }) => {
  const project = useSelector(selectProject);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const changeRoleHere = async (role: string) => {
    try {
      const data = await changeRole(axiosPrivate, project.id, { userId: user.id, role });
      dispatch(setProjectUsers(data.project_users));
      dispatch(setOtherUsers(data.other_users));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[300px] h-[150px]">
      <Card>
        <CardHeader>
          <CardTitle>{user.username}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent>

        </CardContent>
        <CardFooter className="justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild >
              <Button variant="secondary">{userRole}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{userRole === 'other' ? 'Add to project' : 'Change role'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem textValue="admin" onClick={() => changeRoleHere('admin')}>Admin</DropdownMenuItem>
                <DropdownMenuItem textValue="user" onClick={() => changeRoleHere('user')}>User</DropdownMenuItem>
                {userRole === 'admin' || userRole === 'user' && <DropdownMenuItem textValue="other" onClick={() => changeRoleHere('other')}>Remove</DropdownMenuItem>}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </div>
  )
}
