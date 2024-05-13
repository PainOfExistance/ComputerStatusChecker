import { useEffect, useState } from 'react';
import '../.././App.css';
import axios from 'axios';
import './classroom.css'
import { Link } from 'react-router-dom';

function Classrooms() {
    const [classrooms, setClassrooms] = useState<string[]>([]);

    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                const response = await axios.get<string[]>('https://localhost:7238/Classroom');
                console.log(response.data);
                setClassrooms(response.data);
            } catch (error) {
                console.error('Failed to fetch classrooms:', error);
            }
        };

        fetchClassrooms();
    }, []);

    return (
        <div className="classroom-grid">
            {classrooms.map((room, index) => (
                <button key={index} className="classroom-button">
                    <Link to={"/computers/" + room}>{room}</Link>
                </button>
            ))}
        </div>
    );

}

export default Classrooms;
