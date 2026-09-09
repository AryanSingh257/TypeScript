function formatName(firstName:string,secondName:string):string{
  return `${firstName} ${secondName}`;
}

function getGreeting(timeOfDay:string):string{
  return `Good ${timeOfDay}`;
}

function createGreeting(firstName:string,secondName:string,timeOfDay:string):string{
  return `${getGreeting(timeOfDay)}, ${formatName(firstName,secondName)}`;
}
