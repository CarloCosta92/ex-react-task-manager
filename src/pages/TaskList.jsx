import { useCallback, useContext, useMemo, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"

function debounce(callback, delay) {
    let timer
    return (value) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(value)
        }, delay)
    }
}

export default function TaskList() {
    const { tasks } = useContext(GlobalContext)
    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)

    const sortIcon = sortOrder === 1 ? "A" : "B";

    const [searchQuery, setSearchQuery] = useState("")

    const debounceSearch = useCallback(debounce(setSearchQuery, 500), [])

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(field)
            setSortOrder(1)
        }
    }

    const filteredAndSortedTask = useMemo(() => {
        return [...tasks]
            .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => {
                let comparison;

                if (sortBy === "title") {
                    comparison = a.title.localeCompare(b.title)

                } else if (sortBy === "status") {
                    const statusOptions = ["to Do", "Doing", "Done"]
                    comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status)

                } else if (sortBy === "createdAt") {
                    const dateA = new Date(a.createdAt).getTime()
                    const dateB = new Date(b.createdAt).getTime()
                    comparison = dateA - dateB

                }
                return comparison * sortOrder


            })

    },
        [tasks, sortBy, searchQuery])

    return (
        <div>
            <h2>Lista di task</h2>

            <input type="text"
                className="form-control"
                placeholder="cerca"

                onChange={e => debounceSearch(e.target.value)} />
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
                    {filteredAndSortedTask.map((task) => (
                        <TaskRow item={task} key={task.id} />
                    ))}
                </tbody>
            </table>
        </div >
    )
}