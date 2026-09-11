type expense = {
  id: number,
  category: string,
  amount: number,
}

type summary = {
  total: number,
  foodTotal: number,
  transportTotal: number,
  largestExpense: expense | undefined,
}

function calculateTotal(expenses:expense[]):number{
  let totalAmmount:number=0;
  for(let i=0;i<expenses.length;i++){
    totalAmmount+=expenses[i].amount;
  }
  return totalAmmount;
}

function calculateCategoryTotal(expenses:expense[],category:string):number{
  let totalAmmount:number=0;
  for(let i=0;i<expenses.length;i++){
    const expense:expense=expenses[i];
    if(expense.category===category){
      totalAmmount+=expense.amount;
    }
  }
  return totalAmmount;
}

function findLargestExpense(expenses:expense[]){
  let highestAmmount:number = expenses[0].amount;
  for(let i=1;i<expenses.length;i++){
    const ammount:number = expenses[i].amount;
    if(highestAmmount<expenses[i].amount){
      highestAmmount = ammount;
    }
  }
  return expenses.find((expense)=>{
    return expense.amount===highestAmmount;
  });
}

function createExpenseSummary(expenses:expense[]):summary{
  return {
    total: calculateTotal(expenses),
    foodTotal: calculateCategoryTotal(expenses,'food'),
    transportTotal: calculateCategoryTotal(expenses,'transport'),
    largestExpense: findLargestExpense(expenses),
  };
}
