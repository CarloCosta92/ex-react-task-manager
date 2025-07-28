import { useContext, useMemo, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"

export default function TaskList() {
    const { tasks } = useContext(GlobalContext)
    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)

    const sortIcon = sortOrder === 1 ? "A" : "B"

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(field)
            setSortOrder(1)
        }
    }

    const sortedTask = useMemo(() => {
        return [...tasks].sort((a, b) => {
            let comparison;

            if (sortBy === "title") {
                comparison = a.title.localeCompare(b.title)

            } else if (sortBy === "status") {
                const statusOptions = ["to Do", "Doing", "Done"]
                comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.statsus)

            } else if (sortBy === "createdAt") {
                const dateA = new Date(a.createdAt).getTime()
                const dateB = new Date(b.createdAt).getTime()
                comparison = dateA - dateB

            }
            return comparison * sortOrder


        })

    },
        [tasks, sortBy, sortOrder])

    return (
        <div>
            <h2>Lista di task</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" onClick={() => handleSort("title")} >
                            titolo {sortBy === "title" && sortIcon}
                        </th>
                        <th scope="col" onClick={() => handleSort("status")}>
                            stato {sortBy === "status" && sortIcon}
                        </th>
                        <th scope="col" onClick={() => handleSort("createdAt")}>
                            creazione {sortBy === "createdAt" && sortIcon}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTask.map((task) => (
                        <TaskRow item={task} key={task.id} />
                    ))}
                </tbody>
            </table>
        </div >
    )
}