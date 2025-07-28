import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";


const TaskDetail = () => {
    const { id } = useParams();
    const { tasks, removeTask } = useContext(GlobalContext);
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)

    const task = tasks.find(t => String(t.id) === id);

    if (!task) {
        return <div className="alert alert-danger">Task non trovata</div>;
    }
    const confirmDelete = async () => {
        try {
            await removeTask(id);
            setShowModal(false);
            navigate("/");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <>
            <div>
                <h2>Dettagli Task</h2>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title"><strong>Titolo:</strong> {task.title}</h4>
                        <p className="card-text"><strong>Descrizione:</strong> {task.description}</p>
                        <p className="card-text"><strong>Stato:</strong> {task.status}</p>
                        <p className="card-text"><strong>Creato il:</strong> {task.createdAt}</p>
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Elimina Task</button>
                    </div>
                    <Modal
                        title="Conferma eliminazione"
                        content="Sei sicuro di voler eliminare questa task?"
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        onConfirm={confirmDelete}
                    />
                </div>


            </div>
        </>
    )
}

export default TaskDetail