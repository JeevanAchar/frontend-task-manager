import React, { createContext, useContext, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DnDContext = createContext();

export const DnDProvider = ({ children }) => {
    const [draggingItem, setDraggingItem] = useState(null);

    return (
        <DndProvider backend={HTML5Backend}>
            <DnDContext.Provider value={{ draggingItem, setDraggingItem }}>
                {children}
            </DnDContext.Provider>
        </DndProvider>
    );
};

export const useDnD = () => useContext(DnDContext);

export default DnDProvider;
    