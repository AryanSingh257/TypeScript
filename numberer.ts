type description = {
  positive: boolean,
  negative: boolean,
  zero: boolean,
  even: boolean,
  odd: boolean,
}

function isPositive(n:number):boolean{
  return n>=0;
}


function isNegative(n:number):boolean{
  return !isPositive(n);
}


function isZero(n:number):boolean{
  return n==0;
}


function isEven(n:number):boolean{
  return n%2===0;
}

function describeNumber(n:number):description{
  const Even = isEven(n);
  return {
    positive: isPositive(n),
    negative: isNegative(n),
    zero: isZero(n),
    even: Even,
    odd: !Even,
  }
}
