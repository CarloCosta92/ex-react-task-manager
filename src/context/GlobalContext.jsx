import { createContext } from "react";
import useTasks from "../hook/useTasks";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const { tasks, addTask, removeTask, updateTask } = useTasks();
    return (
        <GlobalContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
            {children}
        </GlobalContext.Provider>
    );
};
