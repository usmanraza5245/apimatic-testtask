import {ReactNode,ChangeEvent} from 'react';
export interface JsonItem {
    title: string;
    bodyText: string;
}

export interface UpdateJsonDataType {
    title: string;
    bodyText:string;
    prevTitle:string;
}
export interface JsonDataContextType {
    jsonData: JsonItem[];
    setJsonData: (data: JsonItem[]) => void; // Function to update JSON data
    updateJsonData: (data:UpdateJsonDataType) => void
}

export interface JsonDataProviderProps {
    children: ReactNode;
}

export interface SidebarProps {
    drawerWidth: number;
    menuItems: string[];
    activeItem: string;
    downloadHandler: ()=>void
}

export interface ContentProps {
    pageData: JsonItem;
    isEdit: boolean;
    setIsEdit: (value:boolean) => void;
    updateEditorHandler: (data:UpdateJsonDataType) => void
}

export interface HeaderProps {
    title: string;
    isEdit:boolean;
    setIsEdit:(value:boolean) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSaveEditHandler:()=>void;
}

export interface EditorIntrinsicProps {
    html:string;
    text:string;
}
export interface EditorProps {
    html:string;
    onChange: (data: EditorIntrinsicProps, event?:ChangeEvent<HTMLTextAreaElement>) => void
}