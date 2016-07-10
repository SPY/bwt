"use strict";
function bwt(input) {
    var len = input.length + 2;
    var rotations = new Int32Array(len);
    for (var i = 0; i < len; i++) {
        rotations[i] = i;
    }
    var EOF = len - 2;
    var START = -1;
    var last = len - 1;
    rotations.sort(function (a, b) {
        for (var i = 0; i < len; i++) {
            var x = a + i > last ? i - (len - a) - 1 : i + a - 1;
            var y = b + i > last ? i - (len - b) - 1 : i + b - 1;
            if (x === EOF) {
                return 1 /* GT */;
            }
            else if (x === START) {
                return y === EOF ? -1 /* LT */ : 1 /* GT */;
            }
            else if (y === EOF || y === START) {
                return -1 /* LT */;
            }
            else if (input[x] < input[y]) {
                return -1 /* LT */;
            }
            else if (input[x] > input[y]) {
                return 1 /* GT */;
            }
        }
        return 0 /* EQ */;
    });
    var start = 0;
    var eof = 0;
    var data = new Array(input.length);
    var added = 0;
    for (var i = 0; i < len; i++) {
        var shift = rotations[i];
        var real = shift + last > last ? last - (len - shift) - 1 : last + shift - 1;
        if (real === EOF) {
            eof = i;
        }
        else if (real === START) {
            start = i;
        }
        else {
            data[added++] = input[real];
        }
    }
    return { start: start, data: data.join(''), eof: eof };
}
exports.bwt = bwt;
function ibwt(_a) {
    var start = _a.start, data = _a.data, eof = _a.eof;
    var len = data.length + 2;
    var sorted = new Int32Array(len);
    var permutations = new Int32Array(len);
    for (var i_1 = 0; i_1 < len; i_1++) {
        sorted[i_1] = i_1;
    }
    sorted.sort(function (a, b) {
        if (a === eof) {
            return 1 /* GT */;
        }
        else if (a === start) {
            return b === eof ? -1 /* LT */ : 1 /* GT */;
        }
        else if (b === start || b === eof) {
            return -1 /* LT */;
        }
        var x = a + (a >= start ? -1 + (a >= eof ? -1 : 0) : 0);
        var y = b + (b >= start ? -1 + (b >= eof ? -1 : 0) : 0);
        return data[x] < data[y]
            ? -1 /* LT */
            : (data[x] > data[y]
                ? 1 /* GT */
                : (a < b ? -1 /* LT */ : 1 /* GT */));
    });
    for (var i_2 = 0; i_2 < len; i_2++) {
        permutations[sorted[i_2]] = i_2;
    }
    var current = len - 1;
    var result = new Array(len - 2);
    var i = len - 2;
    while (i--) {
        var idx = current + (current < start ? 0 : (-1 + (current < eof ? 0 : -1)));
        result[i] = data[idx];
        current = permutations[current];
    }
    return result.join('');
}
exports.ibwt = ibwt;
