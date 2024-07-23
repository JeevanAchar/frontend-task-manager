import React from 'react';
import ViewTask from './ViewTask';
import EditTask from './EditTask';
import { useDrag } from 'react-dnd';
import { useTask } from '../../context/TaskContext';

function TaskCard({ task }) {
    const { handleDeleteTask } = useTask();
    const [viewTask, setViewTask] = React.useState(false);
    const [editTask, setEditTask] = React.useState(false);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id: task._id, status: task.status },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [task]);

    return (
        <div className={`p-4 bg-sky-100 rounded-lg shadow-md mb-4 min-h-52 flex flex-col justify-between ${isDragging ? "opacity-50" : ""}`} ref={drag}>
            <div>
                <h3 className="text-gray-600 font-semibold text-lg mb-4">Task: {task.title}</h3>
                <p className="text-gray-600 font-medium text-base mb-4">Description: {task.description}</p>
            </div>
            <div>
                <p className="text-sm mb-5 text-gray-600 font-medium">Created at: {new Date(task.createdAt).toLocaleString()}</p>
                <div className="flex items-center justify-end gap-4">
                    <button onClick={() => handleDeleteTask(task._id)} className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-md px-3 py-1">Delete</button>
                    <button onClick={() => setEditTask(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-3 py-1">Edit</button>
                    <button onClick={() => setViewTask(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-3 py-1">View Details</button>
                </div>
            </div>
            {viewTask && <ViewTask key={task._id} task={task} onClose={setViewTask} />}
            {editTask && <EditTask key={task._id} task={task} onSave={setEditTask} onCancel={setEditTask} />}
        </div>
    );
}

export default TaskCard;
