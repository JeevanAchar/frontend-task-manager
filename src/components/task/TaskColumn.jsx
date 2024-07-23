import React from 'react';
import TaskCard from './TaskCard';
import { useDrop } from 'react-dnd';
import { useTask } from '../../context/TaskContext';

function TaskColumn({ title, tasks }) {
    const { handleDropTask } = useTask();

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item) => {
            handleDropTask(item.id, title.toLowerCase().replace(' ', '-'));
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [title, handleDropTask]);

    return (
        <div className={`lg:w-1/3 w-full mb-4 lg:mb-0 p-4 border border-gray-400 mx-2 shadow-lg rounded-md ${isOver ? "bg-gray-200" : ""}`} ref={drop}>
            <h2 className="text-center text-xl font-medium bg-blue-600 p-2 rounded uppercase text-white mb-4">{title}</h2>
            <div>
                {
                    tasks.map(task => (
                        <TaskCard key={task._id} task={task} />
                    ))
                }
            </div>
        </div>
    );
}

export default TaskColumn;
