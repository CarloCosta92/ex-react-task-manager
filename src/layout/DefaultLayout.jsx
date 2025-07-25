import { NavLink, Outlet } from "react-router-dom";

export default function DefaultLayout() {
    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <div className="container d-flex gap-3">
                        <NavLink to="/" className="navbar-brand">Home</NavLink>
                        <NavLink to="/task-list" className="navbar-brand">Lista di Task</NavLink>
                        <NavLink to="/add-task" className="navbar-brand">Aggiungi Task</NavLink>
                    </div>
                </div>
            </nav>

            <main className="container mt-4">
                <Outlet />
            </main>
        </div>
    )
}