import React, { useState } from 'react';
import axios from 'axios';

const AddErrorForm = ({ fetchErrors, selectedComputer }) => {
    const [problemComputerName, setProblemComputerName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [severity, setSeverity] = useState('');

    const submitError = async () => {
        try {
            const data = {
                name: problemComputerName,
                errorMessage: errorMessage,
                severity: severity,
                ID: ''
            };

            const response = await axios.post('https://localhost:7238/Error/addError', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (selectedComputer?.name === data.name) {
                fetchErrors(data.name);
            }

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }

        setProblemComputerName('');
        setErrorMessage('');
        setSeverity('');
    };

    return (
        <div className= "add-error" >
        <h2>Dodaj napako < /h2>
            < label htmlFor = "problemComputerName" > Ime računalnika: </label>
                < input type = "text" id = "problemComputerName" name = "problemComputerName" value = { problemComputerName } onChange = {(e) => setProblemComputerName(e.target.value)} required />

                    <label htmlFor="errorMessage" > Napaka / sporočilo: </label>
                        < br />
                        <textarea rows={ 5 } id = "errorMessage" name = "errorMessage" value = { errorMessage } onChange = {(e) => setErrorMessage(e.target.value)} required />
                            <br />

                            < label htmlFor = "severity" > Resnost: </label>
                                < select id = "severity" name = "severity" value = { severity } onChange = {(e) => setSeverity(e.target.value)} required >
                                    <option value="" > Izberite resnost < /option>
                                        < option value = "Nizka" > Nizka < /option>
                                            < option value = "Srednja" > Srednja < /option>
                                                < option value = "Visoka" > Visoka < /option>
                                                    < option value = "Kritična" > Kritična < /option>
                                                        < /select>

                                                        < button type = "submit" onClick = { submitError } > Prijavi napako < /button>
                                                            < /div>
    );
};

export default AddErrorForm;
