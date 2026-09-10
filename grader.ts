type gradeReport = {
  name: string,
  score: number,
  grade: string,
  passed: boolean,
  feedback: string,
}

function getGrade(score:number):string{
  if(score>=90){
    return 'A';
  }else if(score>=80){
    return 'B';
  }else if(score>=70){
    return 'C'; 
  }else if(score>=60){
    return 'D';
  }else{
    return 'F';
  }
}

function hasPassed(score:number):boolean{
  return score>=60;
}

function getFeedback(grade:string):string{
  if(grade==='A'){
    return 'Excelent Work'
  }else if(grade==='B'){
    return 'You can do more';
  }else if(grade==='C'){
    return 'You passed';
  }else if(grade==='D'){
    return 'You passed';
  }else{
    return 'Keep practicing';
  }
}

function createGradeReport(name:string,score:number):gradeReport{
  const grade:string = getGrade(score);
  return {
    name: name,
    score: score,
    grade: grade,
    passed: hasPassed(score),
    feedback: getFeedback(grade),
  }
}

console.log(createGradeReport('Ava', 92));
console.log(createGradeReport('Noah', 48));
console.log(createGradeReport('Mina', 75));
console.log(createGradeReport('Sam', 60));
