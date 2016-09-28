function create_table() {
    //reference: http://stackoverflow.com/a/8187521

    var theader = '<table border="1" cellspacing="0">\n';
    var tbody = '';

    for (var i = 0; i < g_map._width; i++) {
        tbody += '<tr>';
        for (var j = 0; j < g_map._height; j++) {
            tbody += '<td id="cell_' + i + '_' + j + '" onclick="clicked(' + i + ',' + j + ');">' + '</td>';
        }
        tbody += '</tr>\n';
    }
    var tfooter = '</table>';
    document.getElementById('wrapper').innerHTML = theader + tbody + tfooter;
}

function draw_map() {
    var living = g_map.count_living_cells();
    document.getElementById('living_now').innerText = living;

    range(g_map._width).forEach(function(x) {
        range(g_map._height).forEach(function(y) {
            var cell = document.getElementById('cell_' + x + '_' + y);
            if (g_map.getCell(x, y)) {
                cell.style.background = 'black';
            } else {
                cell.style.background = 'white';
            }
        })
    });


    var data = {
        one: living
    };

    graph.series.addData(data);
    graph.render();
}
