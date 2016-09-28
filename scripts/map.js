function map(w, h) {
    if (typeof w === 'undefined') w = 10;
    if (typeof h === 'undefined') h = 10;

    var x = new Array(w);
    for (var i = 0; i < w; i++) {
        x[i] = new Array(h);

    };

    return {
        _map: x,
        _new_map: clone(x),
        _width: w,
        _height: h,
        getCell: function(x, y) {
            if (x < 0) x += (Math.ceil((-x) / w)) * w;
            x %= w;
            if (y < 0) y += (Math.ceil((-y) / h)) * h;
            y %= h;
            return this._map[x][y];
        },
        setCell: function(x, y, status) {
            if (x < 0) x += (Math.ceil((-x) / w)) * w;
            x %= w;
            if (y < 0) y += (Math.ceil((-y) / h)) * h;
            y %= h;
            this._new_map[x][y] = status;
        },
        count_living_cells: function() {
            var _this = this;
            var alive_count = 0;
            range(_this._width).forEach(function(x) {
                range(_this._height).forEach(function(y) {
                    if (_this.getCell(x, y))
                        alive_count++;
                });
            });
            return alive_count;
        },
        count_living_cells_in_neighboorhood: function(x, y) {
            var _this = this;
            var neighboor_count = 0;
            [-1, 0, 1].forEach(function(dx) {
                [-1, 0, 1].forEach(function(dy) {
                    if (dx === 0 && dy === 0) {
                        return;
                    }
                    if (_this.getCell(x + dx, y + dy)) {
                        neighboor_count++;
                    }
                });
            });
            return neighboor_count;
        },
        update: function() {
            this._map = clone(this._new_map);
        },
        randomize: function(n) {
            var x = new Array(this._width * this._height);
            for (var i = 0; i < n; i++) {
                x[i] = true;
            };
            shuffle(x);

            var _this = this;
            x.forEach(function(val, index) {
                var _x = index % _this._width;
                var _y = Math.floor(index / _this._width);
                if (val) {
                    _this.setCell(_x, _y, true);
                } else {
                    _this.setCell(_x, _y, undefined);
                }
            })
            this.update();
        }
    };
}
