# cellular-automata
This is an assignment for the course _Software Engineering_.

By Zhaoyang, 2014013432.

## how to play
Open `index.html` with your browser to bring up a graphic user interface.

You may control the status of each individual cell by clicking it. If you're tired of doing so, you may specify the number of living cells and click `Randomize`.

You may also resize the map by specifying width and height, and then clicking `Resize`.

Click `Start` to see the evolution of your cell population.

## how to run tests
Open `test.html` with your browser to see unit test results.

## documentation
- `map` module maintains a two-dimensional boolean-valued array (in another word, a bitmap). `getCell` tells you whether or not the cell at the specified position is alive. `setCell` allows you to kill or revive a cell. Note that what `setCell` actually modifies is a buffer, so you have to call `update` to make the changes effective.
- `logic` module defines the rules in the cells' world. It provides the method `advance`, which takes a map as argument and modifies it so that time advances.
- `display.js` contains functions full of DOM operations, which gives you a visual representation of the map and your cells.
- `main.js` deals with user's input and timing.
- `utilities.js` offers some handful helper functions.
- `tests.js` is where you can find tests.

## references
* Wikipedia, the free encyclopedia
    * [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
    * [Cellular automaton](https://en.wikipedia.org/wiki/Cellular_automaton)
* Stackoverflow-oriented programming
    * http://stackoverflow.com/a/8187521
    * http://stackoverflow.com/a/5344074
    * http://stackoverflow.com/a/6274381
