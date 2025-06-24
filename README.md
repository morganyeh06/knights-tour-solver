# Knight's Tour Solver 
A web application for visualizing solutions to the knight's tour problem on nxn boards, using Warnsdorff's Rule to find solutions.

**Link:** https://knights-tour-solver.onrender.com/

# Built With
* React.js
* Vite
* Bootstrap.css
* Flask

# The Knight's Tour Problem and Warnsdorff's Rule
A [Knight's Tour](https://en.wikipedia.org/wiki/Knight%27s_tour) is a sequence of moves on a chessboard such that the knight piece visits every space exactly once. The knight's tour problem is the mathematical problem that involves finding possible knight's tours on an 8x8 chessboard. Variations of the problem include different nxn board sizes, as well as non-square (nxm) boards.

[Warnsdorff's Rule](https://en.wikipedia.org/wiki/Knight%27s_tour#Warnsdorf.27s_rule) is a heuristic used to find a single knight's tour on a chessboard of arbitrary size. 
The rule states that the knight should always advance to the square with the fewest possible moves from that position. In the case where multiple squares have the same number of following moves, various methods can be used to break the tie. Warnsdorff's Rule greatly decreases the number of backtracking attempts needed to solve the knight's tour problem and drastically improves efficiency.

**Sources:** [Wikipedia](https://en.wikipedia.org/wiki/Knight%27s_tour), [GeeksforGeeks](https://www.geeksforgeeks.org/dsa/the-knights-tour-problem/)

# Usage
1. Select a square on the chessboard and click "Solve" to search for a solution.
2. If found, a knight's tour will be performed on the board, otherwise an error message will be displayed.
3. Click "Clear" to reset the board after the tour is complete.

In the event that a solution is not found, please choose a different square or board size and try again.

## Settings
Various settings can be configured prior to starting a knight's tour:
- Board Size - the number of rows and columns (square boards only)
- Move Delay - the amount of time to pause in between moves in milliseconds
- Knight Colour - White or Black

The following settings can be toggled in the top right corner of the application, and will be remembered for future visits to the page:
- Sound (On/Off)
- Theme (Light/Dark)
