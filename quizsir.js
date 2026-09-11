"use strict";
function isAnswerCorrect(question, userAnswer) {
    if (!userAnswer) {
        return false;
    }
    return question.correctAnswer === userAnswer.answer;
}
function countCorrectAnswers(questions, userAnswers) {
    let count = 0;
    for (const question of questions) {
        let answer = userAnswers.find((val) => {
            return question.id === val.questionId;
        });
        if (isAnswerCorrect(question, answer)) {
            count++;
        }
    }
    return count;
}
function calculatePercentage(correctCount, totalQuestions) {
    return correctCount / totalQuestions * 100;
}
function getResultMessage(perentage) {
    if (perentage >= 80) {
        return "Great work";
    }
    else if (perentage >= 60) {
        return "You passed";
    }
    else {
        return "Keep practicing";
    }
}
function createQuizResult(questions, userAnswers) {
    const corrects = countCorrectAnswers(questions, userAnswers);
    const length = questions.length;
    const percentage = calculatePercentage(corrects, length);
    return {
        correctCount: corrects,
        totalQuestions: length,
        percentage: percentage,
        message: getResultMessage(percentage),
    };
}
