type Question = {
  id: number,
  correctAnswer: string,
}

type Answers = {
  questionId: number,
  answer: string,
}

type Message = "Great work" | "You passed" | "Keep practicing"

type QuizResult = {
  correctCount: number,
  totalQuestions: number,
  percentage: number,
  message: Message,
}

function isAnswerCorrect(question:Question, userAnswer?:Answers){
  if(!userAnswer){
    return false
  }
  return question.correctAnswer===userAnswer.answer;
}

function countCorrectAnswers(questions:Question[],userAnswers:Answers[]):number{
  let count:number=0;
  for(const question of questions){
    let answer = userAnswers.find((val)=>{
      return question.id===val.questionId;
    });
    if(isAnswerCorrect(question,answer)){
      count++;
    }
  }
  return count;
}

function calculatePercentage(correctCount:number,totalQuestions:number):number{
  return correctCount/totalQuestions*100
}

function getResultMessage(perentage:number):Message{
  if(perentage>=80){
    return "Great work";
  }else if(perentage>=60){
    return "You passed";
  }else{
    return "Keep practicing";
  }
}

function createQuizResult(questions:Question[],userAnswers:Answers[]):QuizResult{
  const corrects:number = countCorrectAnswers(questions,userAnswers);
  const length:number = questions.length;
  const percentage:number = calculatePercentage(corrects,length);
  return {
    correctCount: corrects,
    totalQuestions: length,
    percentage: percentage,
    message: getResultMessage(percentage),
  }
}
