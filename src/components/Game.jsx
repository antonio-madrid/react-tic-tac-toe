import { useState } from 'react';
import Board from "./Board.jsx";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    let currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        if (nextMove === 0) {
            setHistory([Array(9).fill(null)])
        }
        setHistory(history.slice(0, nextMove + 1))
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {

        if (history.length !== 1 && move === history.length - 1) {
            return <p key={move}>You are at move: {move}</p>
        }

        let description;
        if (move === 0 && history.length !== 1) description = `Go to game start`;
        if (move > 0) description = `Go to move #${move}`;

        if (move >= 0 && history.length !== 1) {
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{description}</button>
                </li>
            );
        }
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}