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
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate"
import { Loading } from "@/utils/Loading"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Select, SelectGroup, SelectItem, SelectLabel, SelectContent, SelectTrigger, SelectValue } from "./ui/select"

export function CreateIssueDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        key: "",
        status: "todo",
    });

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        if (formData.title === "" || formData.key === "") {
            alert("Please fill in all fields");
            return;
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
                    <DialogTitle>Create Issue</DialogTitle>
                    <DialogDescription>
                        Add issue to this project.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            className="col-span-3"
                            placeholder="Issue title"
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
                            placeholder="Issue Key"
                            name="key"
                            value={formData.key}
                            className="col-span-3"
                            onChange={handleFormDataChange}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Description
                        </Label>
                        <Input
                            placeholder="Description"
                            name="description"
                            value={formData.description}
                            className="col-span-3"
                            onChange={handleFormDataChange}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Status
                        </Label>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="todo">Todo</SelectItem>
                                    <SelectItem value="inprogress">In progress</SelectItem>
                                    <SelectItem value="done">Done</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Issue</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
