import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isFormOpened, setIsFormOpened] = useState(false);

    const fetchTasks = async () => {
        try {
            const { data } = await axiosInstance.get("/api/tasks");
            setTasks(data.data.task);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = async (task) => {
        try {
            const { data } = await axiosInstance.post("/api/task", task);
            if (data.message === "Success") {
                fetchTasks(); // Refetch tasks after adding
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditTask = async (updateTask) => {
        try {
            const { data } = await axiosInstance.put(`/api/task/${updateTask._id}`, updateTask);
            if (data.message === "Success") {
                fetchTasks(); // Refetch tasks after editing
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axiosInstance.delete(`/api/task/${taskId}`);
            fetchTasks(); // Refetch tasks after deleting
        } catch (err) {
            console.error(err);
        }
    };

    const handleDropTask = async (taskId, newStatus) => {
        try {
            // Update task status in the database
            await axiosInstance.put(`/api/task/${taskId}`, { status: newStatus });
            fetchTasks(); // Refetch tasks after dropping
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, selectedTask, setSelectedTask, isFormOpened, setIsFormOpened, handleAddTask, handleEditTask, handleDeleteTask, handleDropTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => useContext(TaskContext);
