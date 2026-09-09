"use strict";
function celsiusToFahrenheit(celsius) {
    return celsius * 1.8 + 32;
}
function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * (5 / 9);
}
function formatTemperature(value, unit) {
    return `${value} ${unit.toUpperCase()}`;
}
