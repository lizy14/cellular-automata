describe('utilities', function() {
    it('has range() working', function() {
        var n = 100;
        var _ = range(n);
        assert.isTrue(_ instanceof Array);
        assert.equal(_.length, n);
        for (var i = 0; i < n; i++) {
            assert.equal(_[i], i);
        }
    });
    it('has shuffle() working', function() {
        range(100).forEach(function(n) {
            var _ = range(n);
            shuffle(_);
            assert.isTrue(_ instanceof Array);
            assert.equal(_.length, n);
            range(n).forEach(function(i) {
                assert.isTrue(_.indexOf(i) != -1);
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
    it('should be an object', function() {
        var _map = new map;
        assert.equal(typeof _map, 'object');
    });
    it('should have certain methods', function() {
        var _map = new map;
        assert.isFunction(_map.setCell);
        assert.isFunction(_map.getCell);
        assert.isFunction(_map.update);
        assert.isFunction(_map.randomize);
    });
    it('should have default size of 10x10', function() {
        var _map = new map;
        assert.equal(_map._map.length, 10);
        assert.equal(_map._map[9].length, 10);
        assert.isUndefined(_map._map[10]);
    });
    it('should be able to remember cell status', function() {
        var _map = new map;
        _map.setCell(5, 5, true);
        assert.isUndefined(_map.getCell(5, 5));
        _map.update();
        assert.isTrue(_map.getCell(5, 5));
		assert.equal(_map.count_living_cells_in_neighboorhood(5, 4), 1);
    });
    it('should handle out-of-range coordinates flawlessly', function() {
        var _map = new map;
        _map.setCell(5, 5, true);
        _map.setCell(-55, -54, true);
        _map.update();
        assert.isTrue(_map.getCell(-15, 55));
        assert.isTrue(_map.getCell(2335, 2336));
		assert.equal(_map.count_living_cells_in_neighboorhood(4, 5), 2);
    });
    it('should have a working randomlize method', function() {
        [0, 10, 23, 88, 100].forEach(function(n) {
            var _map = new map;
            _map.randomize(n);
            assert.equal(_map.count_living_cells(), n);
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
        assert.equal(_map.count_living_cells(), 0);
    })
    it('should work when initially there is only one living cell', function() {
        var _logic = new logic;
        var _map = new map;
        _map.setCell(5, 5, true);
        _map.update();
        assert.equal(_map.count_living_cells(), 1);
        _logic.advance(_map);
        assert.equal(_map.count_living_cells(), 0);
    })
    it('should work when initially there are three living cells in the same row and adjacent to each other', function() {
        var _logic = new logic;
        var _map = new map;
        [4, 5, 6].forEach(function(i) {
            _map.setCell(i, 5, true);
        });
        _map.update();
        assert.equal(_map.count_living_cells(), 3);

        range(100).forEach(function(round_id) {
            _logic.advance(_map);
            assert.equal(_map.count_living_cells(), 3);

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
