import '/src/App.css';
import WhiteKnight from "/src/assets/knight-white.png";
import BlackKnight from "/src/assets/knight-black.png";

interface Props {
    size: number;
    activeSquare: Array<number>;
    knightColour: string;
    states: Array<boolean>
    moves: Map<string, number>;
    isSoundOn: boolean;
    sound: HTMLAudioElement;
    clickHandler: (pos: Array<number>) => void;
}

export default function Board( {size, activeSquare, knightColour, states, 
                                moves, isSoundOn, sound, clickHandler} : Props) {
    // states passed from parent
    const isDisabled = states[0];
    const isLoading = states[2]
    
    // CSS classes and styles
    var classes = isDisabled ? "square size-" + size 
                             : "square size-" + size + " is-active";
    const light = {backgroundColor: "#eeeed2"};
    const dark = {backgroundColor: "#769656" };
    const lightText = {color: "#eeeed2"};
    const darkText = {color: "#769656" };
    const darkBoard = {filter: "brightness(75%)"};
    const lightBoard = {};

    let squares = makeChessBoard();

    // handleClick(pos) sets the square at pos
    // to the starting square on click
    function handleClick(pos: Array<number>) {
        if(!isDisabled) {
            clickHandler(pos);
            if(isSoundOn) { sound.play(); }
        }
    }

    // makeChessBoard() creates a size x size chess board
    function makeChessBoard() {
        let arr = [];

        for(let i = 0; i < size; i++) {
            let col = [];
            for(let j = 0; j < size; j++) {
                // determine colour of square
                var colour = ((i + j) % 2 == 0) ? light : dark;
                var textColour = ((i + j) % 2 == 0) ? darkText : lightText;

                // properties of square
                const coordKey = "row " + j + " col " + i;
                const coord = [j, i];
                const isActive = activeSquare[0] === j && activeSquare[1] == i;

                // create square, display image if square is selected
                // display move number in square if part of moves
                col.push(<div key={coordKey} id={coordKey} className={classes} style={colour} onClick={() => handleClick(coord)}>
                            {isActive ? <img src={knightColour === "White" ? WhiteKnight : BlackKnight} alt="knight"/> : null}
                            {moves.has(coordKey) ? <p className="number" style={textColour}>{moves.get(coordKey)}</p> : null}
                        </div>);
            }

            // add element to array
            arr.push(<div className="board-col" key={i}>{col}</div>);
        }

        return arr;
    }

    return (<div className="board" style={isLoading ? darkBoard : lightBoard}>{squares}</div>);
};