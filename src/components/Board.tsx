import '/src/App.css';
import WhiteKnight from "/src/assets/knight-white.png";
import BlackKnight from "/src/assets/knight-black.png";

interface Props {
    size: number;
    startingCoord: Array<number>;
    knightColour: string;
    isDisabled: boolean;
    moves: Map<string, number>
    clickHandler: (pos: Array<number>) => void;
}

export default function Board( {isDisabled, moves, size, startingCoord, knightColour, clickHandler} : Props) {
    // CSS classes for styling
    var classes = isDisabled ? "square size-" + size : "square size-" + size + " is-active";
    const light = {backgroundColor: "#eeeed2"};
    const dark = {backgroundColor: "#769656" };
    const lightText = {color: "#eeeed2"};
    const darkText = {color: "#769656" };

    let squares = makeChessBoard();

    // handleClick(pos) sets the square at pos
    // to the starting square on click
    function handleClick(pos: Array<number>) {
        if(!isDisabled) {
            clickHandler(pos);
        }
    }

    // makeChessBoard displays a size x size chess board
    function makeChessBoard() {
        let arr = [];

        for(let i = 0; i < size; i++) {
            let row = [];
            for(let j = 0; j < size; j++) {
                // determine colour of square
                var colour = ((i + j) % 2 == 0) ? light : dark;
                var textColour = ((i + j) % 2 == 0) ? darkText : lightText;

                const coordKey = "row " + j + " col " + i;
                const coord = [j, i];
                const isSelected = startingCoord[0] === j && startingCoord[1] == i;
                const isInMap = moves.has(coordKey);

                // create square, display image if square is selected
                row.push(<div key={coordKey} id={coordKey} className={classes} style={colour} onClick={() => handleClick(coord)}>
                            {isSelected ? <img src={knightColour === "White" ? WhiteKnight : BlackKnight} alt="knight"/> : null}
                            {moves.has(coordKey) ? <p className="number" style={textColour}>{moves.get(coordKey)}</p> : null}
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