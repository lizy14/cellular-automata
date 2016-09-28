function logic() {
    return {

        advance: function(map) {
            range(map._width).forEach(function(x) {
                range(map._height).forEach(function(y) {
                    var neighboor_count = map.count_living_cells_in_neighboorhood(x, y);
                    if (neighboor_count === 3) {
                        map.setCell(x, y, true);
                    } else if (neighboor_count === 2) {
                        // do nothing
                    } else {
                        map.setCell(x, y, false);
                    }
                });
            });
            map.update();
        }
    }
}
