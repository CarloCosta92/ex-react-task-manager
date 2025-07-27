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

    const addTask = async ({ title, description, status }) => {
        try {
            const response = await fetch(endpointAPI,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/JSON",
                    },
                    body: JSON.stringify({ title, description, status })
                }
            )

            const result = await response.json()

            if (result.success) {
                setTasks((esistenti) => [...esistenti, result.task])
            } else {
                throw new Error(result.message)
            }
        }
        catch (error) {
            throw new Error(error.message)
        }

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