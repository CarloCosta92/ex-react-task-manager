import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import DefaultLayout from './layout/DefaultLayout'
import Homepage from './pages/Homepage'
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />} >
          <Route path="/" element={<Homepage />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
