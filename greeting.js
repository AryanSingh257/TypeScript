"use strict";
function formatName(firstName, secondName) {
    return `${firstName} ${secondName}`;
}
function getGreeting(timeOfDay) {
    return `Good ${timeOfDay}`;
}
function createGreeting(firstName, secondName, timeOfDay) {
    return `${getGreeting(timeOfDay)}, ${formatName(firstName, secondName)}`;
}
