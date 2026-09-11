"use strict";
function getDisplayName(user) {
    return user.firstName + ' ' + user.lastName;
}
function getLocation(user) {
    return `${user.address.city}, ${user.address.country}`;
}
function getContactSummary(user) {
    return {
        email: user.email,
        phone: user.phone,
    };
}
function isAccountActive(user) {
    return user.account.status === "active";
}
function createProfileSummary(user) {
    return {
        displayName: getDisplayName(user),
        loaction: getLocation(user),
        contact: getContactSummary(user),
        active: isAccountActive(user),
        plan: user.account.plan,
    };
}
