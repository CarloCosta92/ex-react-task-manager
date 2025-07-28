import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";


const TaskDetail = () => {
    const { id } = useParams();
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)


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

    const handleSave = async (updatedTask) => {
        try {
            await updateTask(updatedTask);
            setShowEditModal(false);
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Errore durante il salvataggio: " + error.message);
        }
    };

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
                        <button className="btn btn-warning me-2" onClick={() => setShowEditModal(true)}> Modifica Task</button>
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Elimina Task</button>
                    </div>
                    <Modal
                        title="Conferma eliminazione"
                        content="Sei sicuro di voler eliminare questa task?"
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        onConfirm={confirmDelete}
                    />
                    <EditTaskModal
                        show={showEditModal}
                        onClose={() => setShowEditModal(false)}
                        task={task}
                        onSave={handleSave}
                    />

                </div>


            </div>
        </>
    )
}

export default TaskDetail