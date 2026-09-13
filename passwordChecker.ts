type missingRules = ("minimum length" | "number" | "uppercase letter")[];
type validation = {
  valid: boolean,
  failedRules: missingRules,
}



function hasMinimumLength(password:string):boolean{
  return password.length >= 8;
}

function hasNumber(password:string):boolean{
  return /\d/.test(password);
}

function hasUpeercaseLetter(password:string):boolean{
  return /[A-Z]/.test(password);
}

function getFailedRules(password:string):missingRules{
  let rules:missingRules=[];
  if(!hasMinimumLength(password)){
    rules.push("minimum length")
  }if(!hasNumber(password)){
    rules.push("number");
  }if(!hasUpeercaseLetter(password)){
    rules.push("uppercase letter")
  }
  return rules;
}

function validatePassword(password:string):validation{
  const rules:missingRules=getFailedRules(password);
  return {
    valid: rules.length===0,
    failedRules: rules,
  }
}

console.log(validatePassword('hello'));
console.log(validatePassword('Hello123'));
console.log(validatePassword('hello123'));
console.log(validatePassword('HELLOABC'));
