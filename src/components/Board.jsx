import '../styles.css'
import Square from "./Square.jsx";
import calculateWinner from "../helpers/calculateWinner.js";

export default function Board({ xIsNext, squares, onPlay }) {
    function handleClick(position) {
        if (calculateWinner(squares) || squares[position]) return;

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[position] = 'X';
        } else {
            nextSquares[position] = 'O';
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    const renderBoard = () => {
        const board = [];

        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            const row = [];

            for (let colIndex = 0; colIndex < 3; colIndex++) {
                const cellPosition = rowIndex * 3 + colIndex;
                row.push(
                    <Square
                        key={cellPosition}
                        value={squares[cellPosition]}
                        onSquareClick={() => handleClick(cellPosition)}
                    />
                );
            }

            board.push(
                <div className="board-row" key={rowIndex}>
                    {row}
                </div>
            );
        }

        return board;
    }

    return (
        <>
            <div className="status">{status}</div>
            {renderBoard()}
        </>
    );
}