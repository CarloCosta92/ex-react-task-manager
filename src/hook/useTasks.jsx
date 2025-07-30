import { useState, useEffect, useMemo } from "react";

function useTasks() {
    const [tasks, setTasks] = useState([]);
    const endpointAPI = useMemo(() => `${import.meta.env.VITE_API_URL}/tasks`, []);

    // recupero task
    useEffect(() => {
        fetch(endpointAPI)
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error("Errore nel fetch iniziale:", error.message));
    }, [endpointAPI]);

    //aggiungi
    const addTask = async ({ title, description, status }) => {
        try {
            const response = await fetch(endpointAPI, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description, status }),
            });

            const result = await response.json();
            if (!response.ok || result.success === false) {
                throw new Error(result.message || "Errore nell'aggiunta della task");
            }

            setTasks((prev) => [...prev, result.task]);
        } catch (error) {
            console.error("Errore in addTask:", error.message);
            throw error;
        }
    };

    //rimuovi   
    const removeTask = async (taskId) => {
        try {
            const response = await fetch(`${endpointAPI}/${taskId}`, {
                method: "DELETE",
            });

            const result = await response.json();
            if (!response.ok || result.success === false) {
                throw new Error(result.message || "Errore nella rimozione della task");
            }

            setTasks((prev) => prev.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error("Errore in removeTask:", error.message);
            throw error;
        }
    };

    //aggiorna
    const updateTask = async (updatedTask) => {
        try {
            const response = await fetch(`${endpointAPI}/${updatedTask.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTask),
            });

            const result = await response.json();
            if (!response.ok || result.success === false) {
                throw new Error(result.message || "Errore nell'aggiornamento della task");
            }

            setTasks((prev) =>
                prev.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                )
            );
        } catch (error) {
            console.error("Errore in updateTask:", error.message);
            throw error;
        }
    };

    return { tasks, addTask, removeTask, updateTask };
}

export default useTasks;
