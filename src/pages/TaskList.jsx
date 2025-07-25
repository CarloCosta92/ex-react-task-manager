import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"

export default function TaskList() {
    const { tasks } = useContext(GlobalContext)
    return (
        <div>
            <h2>Lista di task</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">titolo</th>
                        <th scope="col">stato</th>
                        <th scope="col">creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <TaskRow item={task} key={task.id} />
                    ))}
                </tbody>
            </table>
        </div >
    )
}