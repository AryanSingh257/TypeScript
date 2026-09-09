"use strict";
function cleanText(text) {
    return text.trim();
}
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
}
function formatDisplayName(firstName, lastName) {
    return `${capitalize(cleanText(firstName))} ${capitalize(cleanText(lastName))}`;
}
