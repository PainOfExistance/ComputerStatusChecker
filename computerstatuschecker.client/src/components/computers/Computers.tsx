import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "./computers.css";
function Computers() {
    const [computers, setComputers] = useState<Computer[]>([]);
    const [selectedComputer, setSelectedComputer] = useState<Computer | null>(null);
    const { id } = useParams<{ id: string }>(); // Get the classroom ID from URL parameter

    useEffect(() => {
        const fetchComputers = async () => {
            try {
                const response = await axios.get<Computer[]>(`https://localhost:7238/Computer/${id}`);
                setComputers(response.data);
            } catch (error) {
                console.error('Failed to fetch computers:', error);
            }
        };

        fetchComputers();
    }, [id]); // Fetch data when classroomId changes

    const handleComputerClick = (computer: Computer) => {
        setSelectedComputer(computer);
    };

    return (
        <>
            <div className="main-container">
                <div className="computers-container">
                    <div className="computer-details">
                        <div>
                            <h2>Computer Details</h2>
                            <p>Name: {selectedComputer?.name}</p>
                            <p>OS: {/*selectedComputer.os*/}</p>
                            <p>RAM: {/*selectedComputer.ram*/}</p>
                            {/* Add more details as needed */}
                        </div>
                    </div>
                </div>
                <div className="computers-list">
                    <h2>Computers in Classroom {id}</h2>
                    <div className="computer-grid">
                        {computers.map((computer, index) => (
                            <button key={index} className="computer-button" onClick={() => handleComputerClick(computer)}>
                                {computer.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="add-computer">
                    <h2>Add Computer</h2>
                    {/* Add form or input field for adding computers */}
                </div>
            </div>
        </>

    );
}

export default Computers;
