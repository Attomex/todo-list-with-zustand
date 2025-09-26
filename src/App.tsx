import React, { useState } from "react";
import styles from "./App.module.css";
import { CreateTask } from "./components/create-task";
import { MyTask } from "./components/my-tasks";

function App() {
    const [isCreating, setIsCreating] = useState(false);
    const handleCreateTask = () => {
        setIsCreating(!isCreating);
    };

    return (
        <div className={styles["todo-container"]}>
            <MyTask hidden={isCreating} createTask={handleCreateTask} />
            <CreateTask hidden={isCreating} close={handleCreateTask} />
        </div>
    );
}

export default App;
