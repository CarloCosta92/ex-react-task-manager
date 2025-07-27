import { useRef, useState } from "react"

export default function AddTask() {
    const [title, setTitle] = useState("")
    const [error, setError] = useState("")
    const descriptionRef = useRef("")
    const statusRef = useRef("")
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validazione titolo
        if (title.trim() === "") {
            setError("Il titolo non può essere vuoto.");
            return;
        }

        //cerco se qualche simbolo,anche solo uno è incluso nel titolo
        const containsSymbols = [...symbols].some((symbol) => title.includes(symbol));
        if (containsSymbols) {
            setError("Il titolo non può contenere simboli speciali.");
            return;
        }

        setError("");

        const task = {
            title,
            description: descriptionRef.current.value,
            status: statusRef.current.value,
        };

        console.log("Nuovo task:", task);

        // Reset
        setTitle("");
        descriptionRef.current.value = "";
        statusRef.current.value = "";
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Aggiungi un nuovo Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="titolo" className="form-label">Titolo</label>
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
                        ref={descriptionRef} />
                </div>
                <div className="mb-3">
                    <label htmlFor="stato" className="form-label">Stato</label>
                    <select className="form-select"
                        ref={statusRef}>
                        <option>Seleziona lo stato</option>
                        <option>To Do</option>
                        <option>Doing</option>
                        <option>Done</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Aggiungi Task</button>
            </form>
        </div>

    )
}