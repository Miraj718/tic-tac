import React, { useState } from 'react';
import './game.css';
import { useNavigate } from 'react-router-dom';

export default function Game() {
    const navigate = useNavigate();
    const [xValue, setXValue] = useState('');
    const [oValue, setOValue] = useState('');

    const handleXChange = (event) => {
        setXValue(event.target.value);
    };

    const handleOChange = (event) => {
        setOValue(event.target.value);
    };

    const handlestart = () => {
        const defaultXValue = 'x';
        const defaultOValue = 'o';
        
        const finalXValue = xValue || defaultXValue;
        const finalOValue = oValue || defaultOValue;
        
        navigate('/tictactoe', { state: { xValue: finalXValue, oValue: finalOValue } });
    };

    return (
        <div className="start-container">
            <select className="form-select" aria-label="Select for X" value={xValue} onChange={handleXChange}>
                <option value="" disabled>Select for X</option>
                <option value="🧑">🧑</option>
                <option value="👧">👧</option>
                <option value="😍">😍</option>
            </select>
            <select className="form-select" aria-label="Select for O" value={oValue} onChange={handleOChange}>
                <option value="" disabled>Select for O</option>
                <option value="🧑">🧑</option>
                <option value="👧">👧</option>
                <option value="😍">😍</option>
            </select>
            <button className="start-button" onClick={handlestart}>Game Start</button>
        </div>
    );
}
