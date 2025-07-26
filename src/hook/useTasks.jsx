import { useState, useEffect } from "react";

function useTasks() {
    const [tasks, setTasks] = useState([]);
    const endpointAPI = `${import.meta.env.VITE_API_URL}/tasks`;

    useEffect(() => {
        console.log("Chiamando API su:", endpointAPI);
        fetch(endpointAPI)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTasks(data);
            })
            .catch((error) => console.error("Errore nel fetch:", error));
    }, [endpointAPI]);

    const addTask = () => {
        console.log(addTask)
    }

    const removeTask = () => {
        console.log(removeTask)
    }

    const updateTask = () => {
        console.log(updateTask)
    }

    return { tasks, addTask, removeTask, updateTask };

}

export default useTasks