"use strict";
function hasMinimumLength(password) {
    return password.length >= 8;
}
function hasNumber(password) {
    return /\d/.test(password);
}
function hasUpeercaseLetter(password) {
    return /[A-Z]/.test(password);
}
function getFailedRules(password) {
    let rules = [];
    if (!hasMinimumLength(password)) {
        rules.push("minimum length");
    }
    if (!hasNumber(password)) {
        rules.push("number");
    }
    if (!hasUpeercaseLetter(password)) {
        rules.push("uppercase letter");
    }
    return rules;
}
function validatePassword(password) {
    const rules = getFailedRules(password);
    return {
        valid: rules.length === 0,
        failedRules: rules,
    };
}
console.log(validatePassword('hello'));
console.log(validatePassword('Hello123'));
console.log(validatePassword('hello123'));
console.log(validatePassword('HELLOABC'));
