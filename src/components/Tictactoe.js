import React, { useState, useEffect } from 'react';
import './dark.css';
import './Light.css';
import { useLocation } from 'react-router-dom';

function Tictactoe() {
    const location = useLocation();
    const { xValue = '🧑', oValue = '👧' } = location.state || {}; // Default values if not provided

    const [data, setData] = useState(Array(9).fill(''));
    const [current, setCurrent] = useState('x');
    const [status, setStatus] = useState('');
    const [xPlayer, setXPlayer] = useState('');
    const [oPlayer, setOPlayer] = useState('');
    const [theme, setTheme] = useState('dark');
    const [difficulty, setDifficulty] = useState('');

    useEffect(() => {
        let timer;
        if (status.includes('winner') || status.includes('draw')) {
            timer = setTimeout(handleReset, 3000);
        }
        return () => clearTimeout(timer);
    }, [status]);

    const Draw = (num) => {
        if (status.includes('winner') || status.includes('draw')) {
            return; // Prevent any changes if the game is already won or drawn
        }
        if (data[num] === "") {
            const board = [...data];
            board[num] = current === 'x' ? xValue : oValue;
            setData(board);
            if (checkWin(board)) {
                setStatus(`Player  ${current === 'x' ? xValue : oValue.toUpperCase()}  is the winner!`);
                return;
            }
            if (checkDraw(board)) {
                setStatus('Match is a draw!');
                return;
            }
            setCurrent(current === "x" ? "o" : "x");
            if (current === 'o' && difficulty === 'hard') {
                computerMove(board);
            }
        }
    };

    const checkDraw = (board) => {
        return board.every(element => element !== "");
    };

    const checkWin = (board) => {
        const conditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return conditions.some(condition => 
            board[condition[0]] &&
            board[condition[0]] === board[condition[1]] &&
            board[condition[1]] === board[condition[2]]
        );
    };

    const handleReset = () => {
        setData(Array(9).fill(''));
        setCurrent('x');
        setStatus('');
    };

    useEffect(() => {
        if (xValue !== '🧑' || oValue !== '👧') {
            setXPlayer(xValue);
            setOPlayer(oValue);
        }
    }, [xValue, oValue]);

    const computerMove = (board) => {
        let move = findBestMove(board);
        if (move !== -1) {
            board[move] = oValue;
            setData(board);
            if (checkWin(board)) {
                setStatus(`Player ${oPlayer.toUpperCase()} is the winner!`);
                return;
            }
            if (checkDraw(board)) {
                setStatus('Match is a draw!');
                return;
            }
            setCurrent("x");
        }
    };

    const findBestMove = (board) => {
        const availableSpots = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
        if (difficulty === 'hard') {
            // For hard difficulty, find the best move
            for (let i = 0; i < availableSpots.length; i++) {
                const newBoard = [...board];
                newBoard[availableSpots[i]] = oValue;
                if (checkWin(newBoard)) {
                    return availableSpots[i];
                }
            }
        }
        // Return a random move for medium difficulty
        return availableSpots[Math.floor(Math.random() * availableSpots.length)];
    };

    const changetheme = () => {
        setTheme(theme === "dark" ? "light" : "dark"); // Toggle theme between "dark" and "light"
    }

    useEffect(() => {
        document.body.className = theme + "-theme"; // Dynamically set class for body based on theme
    }, [theme]);

    return (
        <div className={`container ${theme}-theme`}>
            <div className='header'>
                <h1 className='title'>Tic Tac Toe Game In <span>Reactjs</span></h1>
                <div className='difficulty'>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="" disabled>Select the level</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
            </div>
            <h2 className='turnStyle'>{status ? status : `Player ${current === 'x' ? xValue : oValue}'s Turn`}</h2>
            <div className='board'>
                <div className="column1">
                    <div className="box" onClick={() => Draw(0)}>{data[0]}</div>
                    <div className="box" onClick={() => Draw(3)}>{data[3]}</div>
                    <div className="box" onClick={() => Draw(6)}>{data[6]}</div>
                </div>
                <div className="column2">
                    <div className="box" onClick={() => Draw(1)}>{data[1]}</div>
                    <div className="box" onClick={() => Draw(4)}>{data[4]}</div>
                    <div className="box" onClick={() => Draw(7)}>{data[7]}</div>
                </div>
                <div className="column3">
                    <div className="box" onClick={() => Draw(2)}>{data[2]}</div>
                    <div className="box" onClick={() => Draw(5)}>{data[5]}</div>
                    <div className="box" onClick={() => Draw(8)}>{data[8]}</div>
                </div>
            </div>
            <button className='change' onClick={changetheme}>Change Theme</button>
            <button className='reset' onClick={handleReset}>Reset</button>
        </div>
    );
}

export default Tictactoe;
