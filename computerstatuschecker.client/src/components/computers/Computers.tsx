import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "./computers.css";

function Computers() {
    const [computers, setComputers] = useState<Computer[]>([]);
    const [errors, setErrors] = useState<ErrorPost[]>([]);
    const [selectedComputer, setSelectedComputer] = useState<Computer | null>(null);
    const { id } = useParams<{ id: string }>(); // Get the classroom ID from URL parameter

    const [computerName, setComputerName] = useState('');
    const [os, setOs] = useState('');
    const [apps, setApps] = useState('');

    const [problemComputerName, setProblemComputerName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [severity, setSeverity] = useState('');

    useEffect(() => {
        fetchComputers();
    }, [id]); // Fetch data when classroomId changes

    const fetchComputers = async () => {
        try {
            const response = await axios.get<Computer[]>(`https://localhost:7238/Computer/${id}`);
            setComputers(response.data);
        } catch (error) {
            console.error('Failed to fetch computers:', error);
        }
    };

    const fetchErrors = async (id: string) => {
        try {
            const response = await axios.get<ErrorPost[]>(`https://localhost:7238/Error/${id}`);
            console.log(response.data);
            setErrors(response.data);
        } catch (error) {
            console.error('Failed to fetch errors:', error);
        }
    };

    const handleComputerClick = (computer: Computer) => {
        setSelectedComputer(computer);
        fetchErrors(computer.name);
    };

    const submitError = async () => {
        try {
            const data: ErrorPost = {
                name: problemComputerName,
                errorMessage: errorMessage,
                severity: severity,
                ID: ''
            }

            const response = await axios.post('https://localhost:7238/Error/addError', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (selectedComputer?.name == data.name) {
                fetchErrors(data.name);
            }

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }

        setProblemComputerName('');
        setErrorMessage('');
        setSeverity('');
    }

    const addComputer = async () => {
        try {
            const data: Computer = {
                name: computerName,
                status: os,
                apps: apps
            }

            const response = await axios.post(`https://localhost:7238/Computer/addComputer/${id}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response.data);
            fetchComputers();
        } catch (error) {
            console.error('Error:', error);
        }

        setComputerName('');
        setOs('');
        setApps('');
    }

    const removeError = async (errorId: string) => {
        try {
            await axios.delete(`https://localhost:7238/Error/deleteError/${errorId}`);
            setErrors(errors.filter(error => error.ID !== errorId));
            console.log('Error removed successfully');
        } catch (error) {
            console.error('Failed to remove error:', error);
        }
    }

    return (
        <>
            <Link to={"/"}>
                <button>
                    <p>Back</p>
                </button>
            </Link>
            <div className="main-container">
                <div className="computers-container">
                    <div className="computer-details">
                        <div>
                            <h2>Podatki o računalniku</h2>
                            <p>Ime: {selectedComputer?.name}</p>
                            <p>Status: {selectedComputer?.status}</p>
                            <p>Aplikacije: {selectedComputer?.apps}</p>
                        </div>
                        <div>
                            <h2>Napake:</h2>
                            {errors.length === 0 ? (<p>Ni napak</p>)
                                : (errors.map((error, index) => (
                                    <div key={index}>
                                        <p>Napaka: {error.errorMessage}</p>
                                        <p>Kritičnost: {error.severity}</p>
                                        <button onClick={() => removeError(error.ID)}>Razrešeno</button>
                                    </div>
                                )))
                            }
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
                    <h2>Dodaj računalnik</h2>
                    <label htmlFor="computerName">Ime:</label>
                    <input type="text" id="computerName" name="computerName" value={computerName} onChange={(e) => setComputerName(e.target.value)} required />

                    <label htmlFor="os">Operacijski sistem:</label>
                    <input type="text" id="os" name="os" value={os} onChange={(e) => setOs(e.target.value)} required />

                    <label htmlFor="apps">Aplikacije:</label>
                    <br />
                    <textarea rows={5} id="apps" name="apps" value={apps} onChange={(e) => setApps(e.target.value)} required />
                    <br />
                    <button type="submit" onClick={addComputer}>Dodaj računalnik</button>

                    <h2>Dodaj napako</h2>
                    <label htmlFor="problemComputerName">Ime računalnika:</label>
                    <input type="text" id="problemComputerName" name="problemComputerName" value={problemComputerName} onChange={(e) => setProblemComputerName(e.target.value)} required />

                    <label htmlFor="errorMessage">Napaka/sporočilo:</label>
                    <br />
                    <textarea rows={5} id="errorMessage" name="errorMessage" value={errorMessage} onChange={(e) => setErrorMessage(e.target.value)} required />
                    <br />

                    <label htmlFor="severity">Resnost:</label>
                    <select id="severity" name="severity" value={severity} onChange={(e) => setSeverity(e.target.value)} required>
                        <option value="">Izberite resnost</option>
                        <option value="Nizka">Nizka</option>
                        <option value="Srednja">Srednja</option>
                        <option value="Visoka">Visoka</option>
                        <option value="Kritična">Kritična</option>
                    </select>

                    <button type="submit" onClick={submitError}>Prijavi napako</button>
                </div>

            </div>
        </>

    );
}

export default Computers;
