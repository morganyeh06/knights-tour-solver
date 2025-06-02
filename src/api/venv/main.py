from flask import Flask, jsonify, request
from flask_cors import CORS

# all possible knight moves written as (dx, dy)
# eg. (1, 2) means right 1 up 2
KNIGHT_MOVES = [
        (2, 1), (1, 2), (-1, 2), (-2, 1),
        (-2, -1), (-1, -2), (1, -2), (2, -1)
    ]



app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route("/", methods=["GET"])

def getMoveListJSON():
    boardSize = int(request.args.get('size'))
    startRow = int(request.args.get('row'))
    startCol = int(request.args.get('col'))

    res = knightsTour(boardSize, startRow, startCol)
    list = [[-1]]
    if not res == [[-1]]:
        list = getMoveList(boardSize, res)

    return jsonify(
        {
            "moves": list
        }
    )




# inRange(low, n, high) returns true if low <= n < high
# requires: low < high
def inRange(low, n, high):
    return low <= n and n < high

# validMove(board, x, y, n) returns true if a move to 
# position (x, y) on an nxn board is valid, false otherwise
# requires: n > 0
def validMove(board, x, y, n):
    return inRange(0, x, n) and inRange(0, y, n) and board[x][y] == -1

# countNextMoves(board, x, y) returns the number of 
# valid knight moves from position (x, y) on board
# requires: (x, y) is valid position on board
def countNextMoves(board, x, y):
    count = 0
    n = len(board)

    # check every move and determine if valid
    for dx, dy in KNIGHT_MOVES:
        next_x = x + dx
        next_y = y + dy

        if(validMove(board, next_x, next_y, n)):
            count += 1
    
    return count

# getNextMoves(board, x, y) returns a list of valid
# moves from position (x, y) on board and sorts them in
# increasing order of possible moves from new position
# requires: (x, y) is valid position on board
def getNextMoves(board, x, y):
    options = []
    n = len(board)

    for i, (dx, dy) in enumerate(KNIGHT_MOVES):
        next_x = x + dx
        next_y = y + dy

        if(validMove(board, next_x, next_y, n)):
            # add possible movecount and index to options
            options.append((countNextMoves(board, next_x, next_y), i))
    
    # sort in order of number of next moves
    options.sort()
    return options


# knightsTourUntil(n, x, y, board, step) traverses
# the board, returning true if successful and false otherwise
# requires: n > 0, (x, y) is valid position on board
def knightsTourUntil(n, x, y, board, step):
    # end if all squares visited
    if step == n * n:
        return True
    
    # get possible moves from current position
    next_moves = getNextMoves(board, x, y)
    for _, index in next_moves:
        next_x = x + KNIGHT_MOVES[index][0]
        next_y = y + KNIGHT_MOVES[index][1]

        # mark next move with current step number
        board[next_x][next_y] = step

        # traverse from new position
        if knightsTourUntil(n, next_x, next_y, board, step + 1):
            return True
        
        # unmark square if search fails
        board[next_x][next_y] = -1
    
    return False
    

# knightsTour(n, x, y) creates an nxn board and attempts to
# solve starting from position (x, y), returning completed
# board or [[-1]] if no is solution found
# requires: n >= 1, (x, y) is a valid position on an nxn board
def knightsTour(n, x, y):
    board = [[-1] * n for _ in range(n)]
    board[x][y] = 0 # temporarily mark starting position

    # traverse board starting from (x, y)
    if not knightsTourUntil(n, x, y, board, 1):
        return [[-1]] # no solution
    
    # confirm only starting square was marked initially
    empty = sum(row.count(0) for row in board)
    if empty == 1:
        return board
    else:
        return [[-1]]

# getMoveList(n, res) returns an ordered list of moves
# needed to solve a Knight's Tour problem of size n
# requires: n > 0
def getMoveList(n, res):
    move_list = [None] * n * n

    for r in range(n):
        for c in range(n):
            i = res[r][c]
            move_list[i] = (r, c)

    return move_list



if __name__ == "__main__":
    app.run(debug=True, port=8080)