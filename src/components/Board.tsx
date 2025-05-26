import '/src/App.css';

interface Props {
    size: number;
}

export default function Board( {size} : Props) {
    var classes = "square size-" + size;
    const light = {backgroundColor: "#eeeed2" };
    const dark = {backgroundColor: "#769656" };
    let squares = makeChessBoard();

    function makeChessBoard() {
        let arr = [];

        for(let i = 0; i < size; i++) {
            let row = [];
            for(let j = 0; j < size; j++) {
                // determine colour of square
                var colour = ((i + j) % 2 == 0) ? light : dark;

                let coord = "(" + i + ", " + j + ")";
                row.push(<div key={coord} className={classes} style={colour}></div>);
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