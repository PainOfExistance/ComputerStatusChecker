import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Classrooms from './components/classroom/Classrooms';
import Computers from './components/computers/Computers';

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Classrooms />} />
                <Route path="/computers/:id" element={<Computers />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;