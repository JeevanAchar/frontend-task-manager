import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DnDContext = React.createContext();

export const DnDProvider = ({ children }) => {
    const [draggingItem, setDraggingItem] = React.useState(null);

    return (
        <DndProvider backend={HTML5Backend}>
            <DnDContext.Provider value={{ draggingItem, setDraggingItem }}>
                {children}
            </DnDContext.Provider>
        </DndProvider>
    );
};

export const useDnD = () => React.useContext(DnDContext);

export default DnDProvider;
