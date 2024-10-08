import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { selectProjects, setProjects } from "@/features/projectSlice"
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate"
import { createProject } from "@/services/projectAPI"
import { Loading } from "@/utils/Loading"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

export function CreateProjectDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const axiosPrivate = useAxiosPrivate();
  const [formData, setFormData] = useState({
    title: "",
    key: "",
  });

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.title === "" || formData.key === "") {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const data = await createProject(axiosPrivate, formData);
      const newProjects = [...projects, data.project];
      dispatch(setProjects(newProjects));
    } catch (err) {
      toast.error(err as string);
    } finally {
      setFormData({
        title: "",
        key: "",
      })
      setOpen(false);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            This is your project.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              className="col-span-3"
              placeholder="Project Name"
              name="title"
              value={formData.title}
              onChange={handleFormDataChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Key  <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Project Key"
              name="key"
              value={formData.key}
              className="col-span-3"
              onChange={handleFormDataChange}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
