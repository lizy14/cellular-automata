g_map = new map;
g_logic = new logic;

var timer = null;

var FRAME_INTERVAL = 50;
var frame_counter = 0;

function frame() {
    g_logic.advance(g_map);
    document.getElementById('living_now').innerText = g_map.count_living_cells();
    document.getElementById('time').innerText = frame_counter;
    frame_counter++;
    draw_map();
}

function toggle() {
    if (timer !== null) {
        clearTimeout(timer);
        timer = null;
        document.getElementById('toggle').innerText = "Start";
    } else {
        timer = setInterval(frame, FRAME_INTERVAL);
        document.getElementById('toggle').innerText = "Stop";
    }
}

function resize() {
    var num_rows = document.getElementById('rows').value || 50;
    document.getElementById('rows').value = num_rows;
    var num_cols = document.getElementById('cols').value || 50;
    document.getElementById('cols').value = num_cols;

    g_map = new map(num_rows, num_cols);
    g_map.randomize(0);

    create_table();
    frame_counter = 0;
}

function randomize() {
    var num_living = document.getElementById('living').value || 800;
    document.getElementById('living').value = num_living;
    g_map.randomize(num_living);
    document.getElementById('living_now').innerText = num_living;
    draw_map();
}


function clicked(x, y) {
    g_map.setCell(x, y, !g_map.getCell(x, y));
    g_map.update();
    draw_map();
}
