import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { DialogTitle } from '@radix-ui/react-dialog'
import { selectAttachment, selectIssue, selectIssues, setAttachment, setIssues } from '@/features/issueSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { deleteIssue, deleteIssueAttachment, downloadIssueAttachment, updateIssue } from '@/services/issueAPI'
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate'
import { Loading } from '@/utils/Loading'
import { CommentCard } from './CommentCard'
import { createComment, deleteComment } from '@/services/commentAPI'
import { selectComments, setComments } from '@/features/commentSlice'
import FileUpload from './FileUpload'
import { toast } from 'react-toastify'

export const IssueDialog = ({ children }: { children: React.ReactNode }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const issues = useSelector(selectIssues);
    const comments = useSelector(selectComments);
    const attachment = useSelector(selectAttachment);
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
            await deleteIssue(axiosPrivate, issue?.id);
            const newIssues = issues.filter((item) => item.id !== issue?.id);
            dispatch(setIssues(newIssues));
        } catch (error) {
            toast.error(error as string);
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
            toast.error(error as string);
        } finally {
            setIsLoading(false);
        }
    }

    // HANDLE SUBMIT COMMENT
    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await createComment(axiosPrivate, issue?.id, { "text": commentValue });
            const newComments = comments.concat(data.comment);
            dispatch(setComments(newComments));
        } catch (error) {
            toast.error(error as string);
        } finally {
            setCommentValue("");
        }
    }

    // HANDLE DELETE COMMENT
    const handleDeleteComment = async (comment: any) => {
        try {
            const data = await deleteComment(axiosPrivate, comment.id);
            const newComments = comments.filter((item) => item.id !== comment.id);
            dispatch(setComments(newComments));
        } catch (error) {
            toast.error(error as string);
        }
    }

    // HANDLE DOWNLOAD ATTACHMENT
    const handleDownloadAttachment = async () => {
        try {
            const data = await downloadIssueAttachment(axiosPrivate, attachment.id);

            // create url for file
            const url = window.URL.createObjectURL(new Blob([data]));
            // create download link
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', attachment.fileName);
            document.body.appendChild(link);
            link.click();

            // clean up
            link.remove();
            window.URL.createObjectURL(url);
        } catch (error) {
            toast.error(error as string);
        }
    }

    // HANDLE DELETE ISSUE ATTACHMENT
    const handleDeleteIssueAttachment = async () => {
        await deleteIssueAttachment(axiosPrivate, issue.id, attachment.id);
        dispatch(setAttachment(null));
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
                    <FileUpload />

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

                {/* SHOW ATTACHMENT */}
                <div className="">
                    <span className='flex gap-2 max-w-[50px]'>
                        {
                            attachment &&
                            <div className="flex justify-between p-2 border border-slate-300 text-sm font-light bg-gray-100">
                                <span className='cursor-pointer' onClick={handleDownloadAttachment}>
                                    {attachment.fileName.slice(14, attachment.fileName.length)}
                                </span>
                                <span className="cursor-pointer" onClick={handleDeleteIssueAttachment}> ❌ </span>
                            </div>
                        }
                    </span>
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
