describe('utilities', function() {
    it('has range() working', function() {
        var n = 100;
        var _ = range(n);
        assert.instanceOf(_, Array);
        assert.equal(n, _.length);
        for (var i = 0; i < n; i++) {
            assert.equal(i, _[i]);
        }
    });
    it('has shuffle() working', function() {
        range(100).forEach(function(n) {
            var _ = range(n);
            shuffle(_);
            assert.instanceOf(_, Array);
            assert.equal(n, _.length);
            range(n).forEach(function(i) {
                assert.notEqual(-1, _.indexOf(i) != -1);
            })
        })
    });
    it('has clone() working', function() {
        var x = {
            name: 'foo',
            gender: 'male'
        };
        var y = x;
        var z = clone(x);

        z.gender = 'female';
        assert.equal(x.gender, 'male');
        y.gender = 'female';
        assert.equal(x.gender, 'female');
    });
})

describe('map', function() {
    it('should have certain methods', function() {
        var _map = new map;
        assert.equal(typeof _map, 'object');
        assert.isFunction(_map.setCell);
        assert.isFunction(_map.getCell);
        assert.isFunction(_map.update);
        assert.isFunction(_map.randomize);
        assert.isFunction(_map.count_living_cells);
    });
    it('should have default size of 10x10', function() {
        var _map = new map;
        assert.equal(10, _map._map.length);
        assert.equal(10, _map._map[9].length);
        assert.isUndefined(_map._map[10]);
    });
    it('should be able to remember cell status', function() {
        var _map = new map;
        _map.setCell(5, 5, true);
        assert.isUndefined(_map.getCell(5, 5));
        _map.update();
        assert.isTrue(_map.getCell(5, 5));
        assert.equal(1, _map.count_living_cells_in_neighboorhood(5, 4));
    });
    it('should handle out-of-range coordinates flawlessly', function() {
        var _map = new map;
        _map.setCell(5, 5, true);
        _map.setCell(-55, -54, true);
        _map.update();
        assert.isTrue(_map.getCell(-15, 55));
        assert.isTrue(_map.getCell(2335, 2336));
        assert.equal(2, _map.count_living_cells_in_neighboorhood(4, 5));
    });
    it('should have a working randomlize method', function() {
        [0, 10, 23, 88, 100].forEach(function(n) {
            var _map = new map;
            _map.randomize(n);
            assert.equal(n, _map.count_living_cells());
        })
    });
});


describe('logic', function() {
    it('should have certain methods', function() {
        var _logic = new logic;
        assert.isFunction(_logic.advance);
    });
    it('should work when initially there is no living cell', function() {
        var _logic = new logic;
        var _map = new map;
        _logic.advance(_map);
        assert.equal(0, _map.count_living_cells());
    })
    it('should work when initially there is only one living cell', function() {
        var _logic = new logic;
        var _map = new map;
        _map.setCell(5, 5, true);
        _map.update();
        assert.equal(1, _map.count_living_cells());
        _logic.advance(_map);
        assert.equal(0, _map.count_living_cells());
    })
    it('should work when initially there are three living cells in the same row and adjacent to each other', function() {
        var _logic = new logic;
        var _map = new map;
        [4, 5, 6].forEach(function(i) {
            _map.setCell(i, 5, true);
        });
        _map.update();
        assert.equal(3, _map.count_living_cells());

        range(100).forEach(function(round_id) {
            _logic.advance(_map);
            assert.equal(3, _map.count_living_cells());

            [4, 5, 6].forEach(function(i) {
                if (round_id % 2 === 0) {
                    assert.isTrue(_map.getCell(5, i));
                } else {
                    assert.isTrue(_map.getCell(i, 5));
                }
            });
        });
    })
});
