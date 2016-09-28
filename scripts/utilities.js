

function range(n) {
    var a = [];
    for (var i = 0; i < n; i++) a.push(i);
    return a;
}


function clone(obj) {
    //deep copy
    //refreence: http://stackoverflow.com/a/5344074
    return JSON.parse(JSON.stringify(obj));
}


function shuffle(a) {
    //reference: http://stackoverflow.com/a/6274381
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
