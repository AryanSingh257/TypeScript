type task = {
  id: number,
  title: string,
  completed: boolean,
}

function addTask(tasks:task[],title:string):task[]{
  tasks.push({
    id: tasks.length+1,
    title: title,
    completed: false,
  })
  return tasks;
}

function completeTask(tasks:task[],taskId:number):task[]{
  tasks[taskId].completed = true;
  return tasks
}

function removeTask(tasks:task[],taskId:number):task[]{
  tasks.splice(taskId-1,1);
  return tasks
}

function countIncompleteTasks(tasks:task[]):number{
  let incompleteTasks:number=0;
  for(let i=0;i<tasks.length;i++){
    if(!tasks[i].completed){
      incompleteTasks++;
    }
  }
  return incompleteTasks;
}


const tasks = [
  { id: 1, title: 'Review variables', completed: true },
  { id: 2, title: 'Practice functions', completed: false },
];
