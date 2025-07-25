import React from "react"

function TaskRow({ item }) {
    let status = ""

    if (item.status === "To do") {
        status = "bg-danger text-white"
    } else if (item.status === "Doing") {
        status = "bg-warning text-dark"
    } else if (item.status === "Done") {
        status = "bg-success text-white"
    }

    return (
        <tr>
            <td>{item.title}</td>
            <td className={status}>{item.status}</td>
            <td>{item.createdAt}</td>
        </tr>
    )
}

export default React.memo(TaskRow)