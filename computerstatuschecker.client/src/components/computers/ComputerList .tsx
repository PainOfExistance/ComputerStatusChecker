import React from 'react';

const ComputerList = ({ computers, handleComputerClick, classroomId }) => (return {(

    <div className="computers-list" >
        <h2>Computers in Classroom {classroomId}</h2>
        < div className="computer-grid" >
            {
                computers.map((computer, index) => (
                <button key= { index } className = "computer-button" onClick = {() => handleComputerClick(computer)} >
            { computer.name }
            < /button>
            ))}
            </div>
    < /div >
)}
);

export default ComputerList;