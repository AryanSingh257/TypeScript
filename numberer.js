"use strict";
function isPositive(n) {
    return n >= 0;
}
function isNegative(n) {
    return !isPositive(n);
}
function isZero(n) {
    return n == 0;
}
function isEven(n) {
    return n % 2 === 0;
}
function describeNumber(n) {
    const Even = isEven(n);
    return {
        positive: isPositive(n),
        negative: isNegative(n),
        zero: isZero(n),
        even: Even,
        odd: !Even,
    };
}
