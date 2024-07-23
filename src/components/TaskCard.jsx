import React from 'react';
import { useDrag } from 'react-dnd';
import { useTask } from '../context/TaskContext';
import ViewTask from './ViewTask';

function TaskCard({ task }) {
    const { handleDeleteTask, handleEditTask, handleViewTask } = useTask();
    const [viewTask, setViewTask] = React.useState(false);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id: task._id, status: task.status },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [task]);

    return (
        <div className={`p-4 bg-blue-100 rounded-lg shadow-md mb-4 min-h-52 flex flex-col justify-between ${isDragging ? "opacity-50" : ""}`} ref={drag}>
            <div>
                <h3 className="font-bold mb-4">{task.title}</h3>
                <p>{task.description}</p>
            </div>
            <div>
                <p className="text-sm mb-5 text-gray-500 font-medium">Created at: {new Date(task.createdAt).toLocaleString()}</p>
                <div className="flex items-center justify-end gap-4">
                    <button onClick={() => handleDeleteTask(task._id)} className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md px-3 py-1">Delete</button>
                    <button onClick={() => handleEditTask(task)} className="bg-blue-300 hover:bg-blue-400 text-white font-medium rounded-md px-3 py-1">Edit</button>
                    <button onClick={() => setViewTask(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-3 py-1">View Details</button>
                </div>
            </div>
            {viewTask && <ViewTask task={task} onClose={setViewTask} />}
        </div>
    );
}

export default TaskCard;
