import React from 'react';
import DnDProvider from './DnDContext';
import { TaskProvider } from './TaskContext';

const Providers = ({ children }) => {
    return (
        <DnDProvider>
            <TaskProvider>
                {children}
            </TaskProvider>
        </DnDProvider>
    );
};

export default Providers;
