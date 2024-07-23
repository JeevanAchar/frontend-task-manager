import React from 'react';
import DnDProvider from './DnDContext';
import { TaskProvider } from './TaskContext';
import { ToastContainer } from 'react-toastify';

const Providers = ({ children }) => {
    return (
        <DnDProvider>
            <ToastContainer />
            <TaskProvider>
                {children}
            </TaskProvider>
        </DnDProvider>
    );
};

export default Providers;
