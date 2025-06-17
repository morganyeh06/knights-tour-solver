from flask import Flask, jsonify, request
from flask_cors import CORS
from waitress import serve
import logging

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(message)s')

# all possible knight moves written as (dr, dc)
# eg. (1, 2) means down 1 row, right 2 columns
KNIGHT_MOVES = [
        (2, 1), (1, 2), (-1, 2), (-2, 1),
        (-2, -1), (-1, -2), (1, -2), (2, -1)
    ]

app = Flask(__name__)
cors = CORS(app, origins='*')
@app.route("/", methods=["GET"])


# getMoveListJSON() returns list of moves
# needed to solve Knights Tour in JSON format,
# returns [[-1]] in JSON is not solution is found
def getMoveListJSON():
    # parameters from front end
    boardSize = int(request.args.get('size'))
    startRow = int(request.args.get('row'))
    startCol = int(request.args.get('col'))

    # get result of Knight's Tour
    res = knightsTour(boardSize, startRow, startCol)
    list = None

    # return result as is if no solution found, 
    # otherwise turn it into 1D list
    if res == [[-1]]:
        list = res
    else :
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


# validMove(board, r, c, n) returns true if a move to 
# position (r, c) on an nxn board is valid, false otherwise
# requires: n > 0
def validMove(board, r, c, n):
    return inRange(0, r, n) and inRange(0, c, n) and board[r][c] == -1


# countNextMoves(board, r, c) returns the number of 
# valid knight moves from position (r, c) on board
# requires: (r, c) is valid position on board
def countNextMoves(board, r, c):
    count = 0
    n = len(board)

    # check every move and determine if valid
    for dr, dc in KNIGHT_MOVES:
        next_r = r + dr
        next_c = c + dc

        if(validMove(board, next_r, next_c, n)):
            count += 1
    
    return count


# getNextMoves(board, r, c) returns a list of valid
# moves from position (r, c) on board and sorts them in
# increasing order of possible moves from new position
# requires: (r, c) is valid position on board
def getNextMoves(board, r, c):
    options = []
    n = len(board)

    # check every move and determine if valid
    for i, (dr, dc) in enumerate(KNIGHT_MOVES):
        next_r = r + dr
        next_c = c + dc

        if(validMove(board, next_r, next_c, n)):
            # add possible movecount and index to options
            options.append((countNextMoves(board, next_r, next_c), i))
    
    # sort in order of number of next moves
    options.sort()
    return options


# knightsTourUntil(n, r, c, board, step) traverses
# the board, returning true if successful and false otherwise
# requires: n > 0, (r, c) is valid position on board
def knightsTourUntil(n, r, c, board, step):
    # end if all squares visited
    if step == n * n:
        return True
    
    # get possible moves from current position
    next_moves = getNextMoves(board, r, c)
    for _, index in next_moves:
        next_r = r + KNIGHT_MOVES[index][0]
        next_c = c + KNIGHT_MOVES[index][1]

        # mark next move with current step number
        board[next_r][next_c] = step

        # traverse from new position
        if knightsTourUntil(n, next_r, next_c, board, step + 1):
            return True
        
        # unmark square if search fails
        board[next_r][next_c] = -1
    
    return False
    

# knightsTour(n, r, c) creates an nxn board and attempts to
# solve starting from position (r, c), returning completed
# board or [[-1]] if no is solution found
# requires: n >= 1, (r, c) is a valid position on an nxn board
def knightsTour(n, r, c):
    board = [[-1] * n for _ in range(n)]
    board[r][c] = 0 # temporarily mark starting position

    # traverse board starting from (x, y)
    if not knightsTourUntil(n, r, c, board, 1):
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

    # go through every row and column in res
    for r in range(n):
        for c in range(n):
            i = res[r][c]
            move_list[i] = (r, c)

    return move_list



if __name__ == "__main__":
    # Development Server
    #app.run(debug=False, port=8080)

    # Production Server (using waitress)
    serve(app, host="127.0.0.1", port=8080)