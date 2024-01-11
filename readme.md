# maze challange

This chalange is inspired by the [Micro mouse](https://en.wikipedia.org/wiki/Micromouse) event.
Writing an algorithm which finds a route to the end of the maze is relatively simple.
But of them most are based on things like breath first search in graphs.
But in real life, this would mean that teleportation is needed.

This challange doesn't allow such teleportations.
All we can do explore the maze by navigating through it.

## How to run

No external modules are required. So just running `node index.js` should run the maze

## creating your own maze algorithms

New algorithms will automatically be detected when you run.
A new algorithm can be added by creating a new file in the algorithms folder.
This file needs to export a createAlgorithm function which returns 2 functions:

* init({getStartPos, getFinish, getWidth, getHeight})
* step({canGoUp, async goUp, canGoDown, async goDown, canGoLeft, async goLeft, canGoRight, async goRight}):
  goUp | goDown | goLeft | goRight

The init function will only run once at the start of the maze.
The step function will keep repeatedly keep asking for a next step, until the maze is solved.

## Adding your own mazes:

New mazes will automatically be detected when you run.
So all you need to do is create a new file in the mazes folder which exports a maze object.
e.g. `module.exports = {maze:{/*your maze*/}}`

This maze object contains 3 fiels:

* start: [x,y]
* finish: [x,y]
* maze: [[rowData],[rowData],[rowData]]

The row data is an array with 0 and 1 where 1 is a wall and 0 is the floor

## future ideas

Some nice features for the future would be to add some extra chalanges.
For example: scoring based on multiple runs where the fastest or the avarage run lenght counts

## Have fun

Enjoy the challange of building your own algorithm.
And feel free to contribute your algorithm or mazes to this repo, so more examples will be available. 
