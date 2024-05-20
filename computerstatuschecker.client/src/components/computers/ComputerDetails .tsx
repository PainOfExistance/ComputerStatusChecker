import React from 'react';

const ComputerDetails = ({ selectedComputer, errors, removeError }) => (
    <div className= "computer-details" >
    <div>
    <h2>Podatki o računalniku</h2>
        < p > Ime: { selectedComputer?.name } </p>
            < p > Status: { selectedComputer?.status } </p>
                < p > Aplikacije: { selectedComputer?.apps } </p>
                    < /div>
                    < div >
                    <h2>Napake: </h2>
{
    errors.length === 0 ? (<p>Ni napak < /p>)
                : (errors.map((error, index) => (
        <div key= { index } >
        <p>Napaka: { error.errorMessage } < /p>
        < p > Kritičnost: { error.severity } < /p>
    < button onClick = {() => removeError(error.ID)}> Razrešeno < /button>
        < /div>
                )))
            }
</div>
    < /div>
);

export default ComputerDetails;
