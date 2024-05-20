import React, { useState } from 'react';
import axios from 'axios';

const AddComputerForm = ({ classroomId, fetchComputers }) => {
    const [computerName, setComputerName] = useState('');
    const [os, setOs] = useState('');
    const [apps, setApps] = useState('');

    const addComputer = async () => {
        try {
            const data = {
                name: computerName,
                status: os,
                apps: apps
            };

            const response = await axios.post(`https://localhost:7238/Computer/addComputer/${classroomId}`, data, {
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
    };

    return (
        <div className= "add-computer" >
        <h2>Dodaj računalnik < /h2>
            < label htmlFor = "computerName" > Ime: </label>
                < input type = "text" id = "computerName" name = "computerName" value = { computerName } onChange = {(e) => setComputerName(e.target.value)} required />

                    <label htmlFor="os" > Operacijski sistem: </label>
                        < input type = "text" id = "os" name = "os" value = { os } onChange = {(e) => setOs(e.target.value)} required />

                            <label htmlFor="apps" > Aplikacije: </label>
                                < br />
                                <textarea rows={ 5 } id = "apps" name = "apps" value = { apps } onChange = {(e) => setApps(e.target.value)} required />
                                    <br />
                                    < button type = "submit" onClick = { addComputer } > Dodaj računalnik < /button>
                                        < /div>
    );
};

export default AddComputerForm;
