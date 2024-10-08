import { useRef } from 'react';
import { Button } from './ui/button';
import { attachToIssue } from '@/services/issueAPI';
import { useDispatch, useSelector } from 'react-redux';
import { selectIssue, setAttachment } from '@/features/issueSlice';
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate';

const FileUpload = () => {
    const issue = useSelector(selectIssue);
    const axiosPrivate = useAxiosPrivate();
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        if (fileInputRef.current !== null) {
            fileInputRef.current.click(); // Trigger the file input click
        }
    };

    const handleFileChange = async (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            const formData = new FormData();
            formData.append("attachment", file);
            // Here you can handle the file upload logic, e.g., send it to a server
            const data = await attachToIssue(axiosPrivate, issue.id, formData);
            dispatch(setAttachment(data.attachment));
        }
    };

    return (
        <div>
            <Button variant="secondary" className="" onClick={handleButtonClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                </svg>
                Attach
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }} // Hide the file input
                onChange={handleFileChange}
            />
        </div>
    );
};

export default FileUpload;
