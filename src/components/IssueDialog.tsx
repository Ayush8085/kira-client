import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { DialogTitle } from '@radix-ui/react-dialog'
import { selectIssue, selectIssues, setIssues } from '@/features/issueSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { deleteIssue, updateIssue } from '@/services/issueAPI'
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate'
import { Loading } from '@/utils/Loading'
import { CommentCard } from './CommentCard'
import { createComment, deleteComment } from '@/services/commentAPI'
import { selectComments, setComments } from '@/features/commentSlice'

export const IssueDialog = ({ children }: { children: React.ReactNode }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const issues = useSelector(selectIssues);
    const comments = useSelector(selectComments);
    const statusVal: Record<string, string> = {
        "todo": "Todo",
        "inprogress": "In Progress",
        "done": "Done"
    }

    const issue = useSelector(selectIssue);
    const [formData, setFormData] = useState({
        title: issue?.title,
        description: issue?.description || "",
        status: issue?.status,
    });

    useEffect(() => {
        setFormData({
            title: issue?.title,
            description: issue?.description || "",
            status: issue?.status,
        })
    }, [issue]);

    // HANDLE DELETE ISSUE
    const handleDeleteIssue = async () => {
        try {
            const data = await deleteIssue(axiosPrivate, issue?.id);
            const newIssues = issues.filter((item) => item.id !== issue?.id);
            dispatch(setIssues(newIssues));
        } catch (error) {
            console.log(error);
        }
    }

    // HANDLE SUBMIT ISSUE
    const handleSubmitIssue = async () => {
        setIsLoading(true);
        try {
            const data = await updateIssue(axiosPrivate, issue?.id, formData);
            const newIssues = issues.filter((item) => item.id !== issue?.id);
            newIssues.push(data.issue);
            dispatch(setIssues(newIssues));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    // HANDLE SUBMIT COMMENT
    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("commentValue: ", { "text": commentValue });
            const data = await createComment(axiosPrivate, issue?.id, { "text": commentValue });
            const newComments = comments.concat(data.comment);
            dispatch(setComments(newComments));
        } catch (error) {
            console.log(error);
        } finally {
            setCommentValue("");
        }
    }

    // HANDLE DELETE COMMENT
    const handleDeleteComment = async (comment: any) => {
        try {
            const data = await deleteComment(axiosPrivate, comment.id);
            console.log("DELETE COMMENT: ", data);
            const newComments = comments.filter((item) => item.id !== comment.id);
            dispatch(setComments(newComments));
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {/* UPPER HEADER */}
                <DialogHeader className='flex flex-row justify-between pr-4'>
                    {/* TITLE */}
                    <DialogTitle className="text-2xl flex gap-2 font-semibold">
                        {openEdit ? <Input type='text' value={formData.title} name='title' onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder='Issue Title...' /> : <span>{issue?.title}</span>}
                    </DialogTitle>

                    <div className="flex gap-4">
                        {/* EDIT ISSUE BUTTON */}
                        {openEdit ? (
                            <>
                                <Button variant="destructive" onClick={() => setOpenEdit(!openEdit)}>Cancel</Button>
                                <Button variant="secondary" onClick={() => { handleSubmitIssue(); setOpenEdit(!openEdit) }}>Save</Button>
                            </>
                        ) : (
                            <Button variant="secondary" onClick={() => setOpenEdit(!openEdit)}>Edit</Button>
                        )}
                        {/* DELETE ISSUE BUTTON */}
                        <svg onClick={handleDeleteIssue} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hover:text-slate-700 transition cursor-pointer mt-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </div>
                </DialogHeader>

                {/* UPPER BUTTONS */}
                <div className="flex gap-2">
                    {/* ATTACH */}
                    <Button variant="secondary" className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                        </svg>
                        Attach
                    </Button>

                    {/* SELECT TODO STATUS */}
                    <Select onValueChange={(e) => setFormData({ ...formData, status: e })}>
                        <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{statusVal[issue?.status]}</SelectLabel>
                                {Object.keys(statusVal).map((key) => (
                                    <SelectItem key={key} value={key}>
                                        {statusVal[key]}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="">
                    {/* DESCRIPTION */}
                    <Label className='flex  gap-2'>
                        <span>Description</span>
                    </Label>
                    {issue?.description ? (
                        <>
                            {!openEdit && <p className="text-sm font-light">{issue?.description}</p>}
                            {openEdit && <Textarea value={formData.description} name='description' onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder='Enter description' />}
                        </>
                    ) : (
                        <>
                            {!openEdit && <p className="text-sm font-light">No description</p>}
                            {openEdit && <Textarea value={formData.description} name='description' onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder='Enter description' />}
                        </>
                    )}
                </div>

                {/* COMMENTS GOES HERE */}
                <form className="" onSubmit={handleCommentSubmit}>
                    <Label className='mb-4'>
                        Activity
                    </Label>
                    <Input value={commentValue} name='commentValue' onChange={(e) => setCommentValue(e.target.value)} placeholder='Add a comment...' />
                </form>

                {/* DISPLAY COMMENTS HERE */}
                <div className="comments">
                    {comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} handleDeleteComment={() => handleDeleteComment(comment)} />
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
