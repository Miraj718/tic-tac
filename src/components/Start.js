import React from 'react';
import './start.css';
import { useNavigate } from 'react-router-dom';

export default function Start() {
    const navigate = useNavigate();

    const handlestart = () => {
        navigate('/game');
    };

    return (
        <div className="start-container">
        <button className="start-button" onClick={handlestart}>Game Start</button>
    </div>
    );
}



