import React from "react";
import TaskContainer from "../components/TaskContainer";
import AuthGuard from "../guard/AuthGuard";

function Dashboard() {
    return (
        <div>
            <AuthGuard>
                <TaskContainer />
            </AuthGuard>
        </div>
    );
}

export default Dashboard;
