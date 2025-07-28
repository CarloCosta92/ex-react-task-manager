import { useRef } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";

export default function editTaskModal(
    {
        show = false,
        onClose = () => { },
        task = {},
        onSave = () => { },
    }) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")

    const editFormRef = useRef(null);

    useEffect(() => {
        if (task) {
            setTitle(task.title),
                setDescription(task.description),
                setStatus(task.setStatus)
        }
    }, [task])

    if (!task) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...task,
            title,
            description,
            status,
        });
        onClose();
    }

    {
        if (!show) return null;

        const content = (

            <div className="container mt-4">
                <h2 className="mb-4">Modifica task</h2>
                <form ref={editFormRef} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="titolo" className="form-label"></label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Inserisci il titolo"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descrizione" className="form-label">Descrizione</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Inserisci la descrizione"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="stato" className="form-label">Stato</label>
                        <select className="form-select"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Seleziona lo stato</option>
                            <option value="To Do">To Do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>

                        </select>
                    </div>
                </form>
            </div>
        );

        return (
            <Modal
                show={show}
                title="Modifica Task"
                content={content}
                confirmText="Salva"
                onConfirm={() => editFormRef.current?.requestSubmit()}
                onClose={onClose}
            />
        )

    }
}
