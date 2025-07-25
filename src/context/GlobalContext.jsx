import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
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

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    );
};
