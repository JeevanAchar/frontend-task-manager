import React from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const TaskContext = React.createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = React.useState([]);
    const [selectedTask, setSelectedTask] = React.useState(null);
    const [isFormOpened, setIsFormOpened] = React.useState(false);
    const userId = window.localStorage.getItem("userId");

    const fetchTasks = async () => {
        try {
            const { data } = await axiosInstance.get(`/api/tasks/${userId}`);
            setTasks(data.data.task);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch tasks');
        }
    };

    React.useEffect(() => {
        if (userId) {
            fetchTasks();
        }
    }, [userId]);

    const handleAddTask = async (task) => {
        try {
            const { data } = await axiosInstance.post(`/api/task/${userId}`, task);
            if (data.message === "Success") {
                fetchTasks(); // Refetch tasks after adding
                toast.success("Task added successfully");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to add task");
        }
    };

    const handleEditTask = async (updateTask) => {
        try {
            const { data } = await axiosInstance.put(`/api/task/${updateTask._id}`, updateTask);
            if (data.message === "Success") {
                fetchTasks(); // Refetch tasks after editing
                toast.success("Task edited successfully");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to edit task");
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axiosInstance.delete(`/api/task/${taskId}`);
            fetchTasks(); // Refetch tasks after deleting
            toast.success("Task deleted successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete task");
        }
    };

    const handleDropTask = async (taskId, newStatus) => {
        try {
            // Update task status in the database
            await axiosInstance.put(`/api/task/${taskId}`, { status: newStatus });
            fetchTasks(); // Refetch tasks after dropping
            toast.success("Task status updated");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update the task");
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, selectedTask, setSelectedTask, isFormOpened, setIsFormOpened, handleAddTask, handleEditTask, handleDeleteTask, handleDropTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => React.useContext(TaskContext);
