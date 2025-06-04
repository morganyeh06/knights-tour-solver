import '/src/App.css';
import WhiteKnight from "/src/assets/knight-white.png";
import BlackKnight from "/src/assets/knight-black.png";
import { useState } from 'react';

interface Props {
    size: number;
    startingCoord: Array<number>;
    knightColour: string;
    clickHandler: (pos: Array<number>) => void;
    
}

export default function Board( {size, startingCoord, knightColour, clickHandler} : Props) {
    // CSS classes for styling
    var classes = "square size-" + size;
    const light = {backgroundColor: "#eeeed2" };
    const dark = {backgroundColor: "#769656" };

    let squares = makeChessBoard();

    // makeChessBoard displays a size x size chess board
    function makeChessBoard() {
        let arr = [];

        for(let i = 0; i < size; i++) {
            let row = [];
            for(let j = 0; j < size; j++) {
                // determine colour of square
                var colour = ((i + j) % 2 == 0) ? light : dark;

                let coordKey = "row " + j + " col " + i;
                let coord = [j, i];
                let isSelected = startingCoord[0] === j && startingCoord[1] == i;

                // create square, display image if square is selected
                row.push(<div key={coordKey} id={coordKey} className={classes} style={colour} onClick={() => clickHandler(coord)}>
                            {isSelected ? <img src={knightColour === "White" ? WhiteKnight : BlackKnight} alt="white knight"/> : null}
                        </div>);
            }

            arr.push(<div key={i}>{row}</div>);
        }

        return arr;
    }

    return (<>
        <div className="board">
            {squares}
        </div>
    </>)
}