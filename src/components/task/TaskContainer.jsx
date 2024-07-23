import React from 'react';
import TaskColumn from './TaskColumn';
import TaskForm from './TaskForm';
import { useTask } from '../../context/TaskContext';

function TaskContainer() {
    const { tasks, selectedTask, setSelectedTask, isFormOpened, setIsFormOpened, handleAddTask, handleEditTask } = useTask();
    const [searchTask, setSearchTask] = React.useState("");
    const [sortTask, setSortTask] = React.useState("recent");
    const [filteredTasks, setFilteredTasks] = React.useState([]);

    const fetchFilteredTask = () => {
        let filtered = tasks;

        if (searchTask) {
            filtered = filtered.filter((task) => {
                return task.title.toLowerCase().includes(searchTask.toLowerCase()) ||
                    task.description.toLowerCase().includes(searchTask.toLowerCase())
            });
        }

        if (sortTask === "recent") {
            filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else {
            filtered = filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        setFilteredTasks(filtered);
    }

    React.useEffect(() => {
        try {
            fetchFilteredTask()
        } catch (err) {
            console.error(err);
        }
    }, [tasks, searchTask, sortTask]);

    return (
        <div className="p-4">
            <button onClick={() => setIsFormOpened(true)} className="text-white bg-blue-500 px-8 py-1 rounded mb-4">Add task</button>
            <div className="bg-white shadow-md md:p-4 p-2 rounded flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <label htmlFor="search" className='text-sm md:text-base'>Search:</label>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Search..."
                        className="max-w-28 md:max-w-xs px-4 py-1 border border-gray-500 outline-gray-500 rounded"
                        value={searchTask}
                        onChange={(e) => setSearchTask(e.target.value)}
                    />
                </div>
                <div className="flex items-center md:gap-4">
                    <label htmlFor="sort" className='text-sm md:text-base'>Sort By:</label>
                    <select
                        name="sort"
                        id="sort"
                        className="px-3 py-1 border border-gray-500 outline-gray-500 rounded"
                        value={sortTask}
                        onChange={(e) => setSortTask(e.target.value)}
                    >
                        <option value="recent">Recent</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>
            <div className="md:flex w-full">
                <TaskColumn title="todo" tasks={filteredTasks.filter(task => task.status === "todo")} />
                <TaskColumn title="In progress" tasks={filteredTasks.filter(task => task.status === "in-progress")} />
                <TaskColumn title="done" tasks={filteredTasks.filter(task => task.status === "done")} />
            </div>
            {isFormOpened && (
                <TaskForm
                    onSave={selectedTask ? handleEditTask : handleAddTask}
                    task={selectedTask}
                    onClose={() => { setIsFormOpened(false); setSelectedTask(null); }}
                />
            )}
        </div>
    );
}

export default TaskContainer;
