import React, { useState } from 'react';
import { Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from './Header';
import { ContentProps, JsonItem } from '../types';
import Editor from './Editor';
import { toast } from 'react-toastify';

const Content: React.FC<ContentProps> = ({ pageData, isEdit, setIsEdit, updateEditorHandler }) => {
    const [editorData, setEditorData] = useState<JsonItem>(pageData);

    const editorChangeHandler = ({ text }: { text: string }) => {
        setEditorData({ ...editorData, bodyText: text })
    }

    const onSaveEditHandler = () => {
        if (!editorData.title || !editorData.bodyText) {
            return toast.error("Title and body can not be empty")
        }
        updateEditorHandler({ ...editorData, prevTitle: pageData.title })
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditorData({ ...editorData, title: event.target.value || "" })
    }
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                p: 3,
            }}
        >
            <Header title={pageData?.title} setIsEdit={setIsEdit} isEdit={isEdit} onSaveEditHandler={onSaveEditHandler} handleInputChange={handleInputChange} />
            {
                isEdit ? <Editor html={editorData.bodyText} onChange={editorChangeHandler} /> : <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {pageData?.bodyText}
                </ReactMarkdown>
            }

        </Box>
    );
};

export default Content;
