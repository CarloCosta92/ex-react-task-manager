import { useState, useEffect, useMemo } from "react";

function useTasks() {
    const [tasks, setTasks] = useState([]);
    const endpointAPI = useMemo(() => `${import.meta.env.VITE_API_URL}/tasks`, []);

    useEffect(() => {
        // console.log("Chiamando API su:", endpointAPI);
        fetch(endpointAPI)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
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

    const removeTask = async taskId => {
        const response = await fetch(`${endpointAPI}/${taskId}`, {
            method: "DELETE"
        })

        const { success, message } = await response.json();
        if (!success) throw new Error(message)

        setTasks(prev => prev.filter(task => task.id !== taskId))
    }

    const updateTask = async (updatedTask) => {
        const response = await fetch(`${endpointAPI}/${updatedTask.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        });

        const { success, message } = await response.json();
        if (!success) throw new Error(message);

        setTasks((prev) =>
            prev.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };
    return { tasks, addTask, removeTask, updateTask };

}

export default useTasks