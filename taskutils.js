"use strict";
function addTask(tasks, title) {
    tasks.push({
        id: tasks.length + 1,
        title: title,
        completed: false,
    });
    return tasks;
}
function completeTask(tasks, taskId) {
    tasks[taskId].completed = true;
    return tasks;
}
function removeTask(tasks, taskId) {
    tasks.splice(taskId - 1, 1);
    return tasks;
}
function countIncompleteTasks(tasks) {
    let incompleteTasks = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].completed) {
            incompleteTasks++;
        }
    }
    return incompleteTasks;
}
const tasks = [
    { id: 1, title: 'Review variables', completed: true },
    { id: 2, title: 'Practice functions', completed: false },
];
