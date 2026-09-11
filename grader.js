"use strict";
function getGrade(score) {
    if (score >= 90) {
        return 'A';
    }
    else if (score >= 80) {
        return 'B';
    }
    else if (score >= 70) {
        return 'C';
    }
    else if (score >= 60) {
        return 'D';
    }
    else {
        return 'F';
    }
}
function hasPassed(score) {
    return score >= 60;
}
function getFeedback(grade) {
    if (grade === 'A') {
        return 'Excelent Work';
    }
    else if (grade === 'B') {
        return 'Great work';
    }
    else if (grade === 'C' || grade === 'D') {
        return 'You passed';
    }
    else {
        return 'Keep practicing';
    }
}
function createGradeReport(name, score) {
    const grade = getGrade(score);
    return {
        name: name,
        score: score,
        grade: grade,
        passed: hasPassed(score),
        feedback: getFeedback(grade),
    };
}
console.log(createGradeReport('Ava', 92));
console.log(createGradeReport('Noah', 48));
console.log(createGradeReport('Mina', 75));
console.log(createGradeReport('Sam', 60));
