"use strict";
function calculateTotal(expenses) {
    let totalAmmount = 0;
    for (let i = 0; i < expenses.length; i++) {
        totalAmmount += expenses[i].amount;
    }
    return totalAmmount;
}
function calculateCategoryTotal(expenses, category) {
    let totalAmmount = 0;
    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        if (expense.category === category) {
            totalAmmount += expense.amount;
        }
    }
    return totalAmmount;
}
function findLargestExpense(expenses) {
    let highestAmmount = expenses[0].amount;
    for (let i = 1; i < expenses.length; i++) {
        const ammount = expenses[i].amount;
        if (highestAmmount < expenses[i].amount) {
            highestAmmount = ammount;
        }
    }
    return expenses.find((expense) => {
        return expense.amount === highestAmmount;
    });
}
function createExpenseSummary(expenses) {
    return {
        total: calculateTotal(expenses),
        foodTotal: calculateCategoryTotal(expenses, 'food'),
        transportTotal: calculateCategoryTotal(expenses, 'transport'),
        largestExpense: findLargestExpense(expenses),
    };
}
