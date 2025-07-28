import { createPortal } from "react-dom";

export default function Modal({
    title = "Titolo della modale",
    content = "Il contenuto principale della modale",
    show = false,
    onClose = () => { },
    onConfirm = () => { },
}) {
    if (!show) return null;

    return (show && createPortal(
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>{content}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Annulla
                        </button>
                        <button type="button" className="btn btn-primary" onClick={onConfirm}>
                            Conferma
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body)
    );
}
