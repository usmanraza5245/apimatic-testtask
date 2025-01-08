import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Helmet } from 'react-helmet'
import PageNotFound from "../components/PageNotFound";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import { JsonItem, UpdateJsonDataType } from "../types";
import { useJsonData } from "../context/JsonDataContext";
import { toast } from "react-toastify";

const drawerWidth = 240;

function DynamicPage() {

    const [loading, setLoading] = useState(true);
    const [pageData, setPageData] = useState<JsonItem | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    //get the param
    const { title } = useParams(); // Access the dynamic parameter from the URL
    const navigate = useNavigate();
    const { jsonData, updateJsonData } = useJsonData();

    useEffect(() => {
        const pageData = jsonData?.find((item: JsonItem) => item.title === title);
        if (!!pageData) {
            setPageData(pageData);
        }
        setLoading(false)
    }, [jsonData, title])

    const updateEditorHandler = (data: UpdateJsonDataType) => {
        try {
            updateJsonData(data);
            setIsEdit(false);
            navigate(`/${data.title}`);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
    }

    const downloadClickHandler = () => {
        const pageData = {
            Pages: jsonData
        }
        const jsonString = JSON.stringify(pageData, null, 2);

        // Create a Blob object
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'page-data.json'; // Name of the downloaded file

        // Trigger the download
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
    }
    return (
        <>
            <Helmet>
                <title>{
                    loading ? "Loading ..." : !!pageData ? pageData.title : "Page not found"
                }</title>
            </Helmet>
            {
                loading ? "Loading..." : !!pageData ? <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Sidebar drawerWidth={drawerWidth} menuItems={jsonData?.map((item: JsonItem) => item.title)} activeItem={pageData?.title} downloadHandler={downloadClickHandler} />
                    <Content pageData={pageData} isEdit={isEdit} setIsEdit={setIsEdit} updateEditorHandler={updateEditorHandler} />
                </Box> : <PageNotFound />
            }
        </>
    )
}

export default DynamicPage