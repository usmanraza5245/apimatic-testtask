import React, { createContext, useContext, useState } from "react";
import { JsonDataContextType, JsonDataProviderProps, JsonItem, UpdateJsonDataType } from "../types";

// Create the context
const JsonDataContext = createContext<JsonDataContextType | undefined>(undefined);

// Provider component
export const JsonDataProvider: React.FC<JsonDataProviderProps> = ({ children }) => {
    const [jsonData, setJsonData] = useState<JsonItem[]>([]);

    const updateJsonData = ({ prevTitle, title, bodyText }: UpdateJsonDataType) => {
        const itemIndex = jsonData.findIndex((item) => item.title === prevTitle);

        if (itemIndex < 0) {
            throw new Error('Item with the previous title not found.');
        }

        // Check if the new title already exists (excluding the current item being updated)
        const isDuplicateTitle = jsonData.some((item, index) => item.title === title && index !== itemIndex);
        if (isDuplicateTitle) {
            throw new Error('The title must be unique.')
        }

        //update the item
        const allJsonData = jsonData;
        allJsonData[itemIndex] = { title, bodyText };
        setJsonData([...allJsonData])
    }
    return (
        <JsonDataContext.Provider value={{ jsonData, setJsonData, updateJsonData }}>
            {children}
        </JsonDataContext.Provider>
    );
};

// Custom hook to use the context
export const useJsonData = (): JsonDataContextType => {
    const context = useContext(JsonDataContext);
    if (!context) {
        throw new Error("useJsonData must be used within a JsonDataProvider");
    }
    return context;
};
