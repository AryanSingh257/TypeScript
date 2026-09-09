function cleanText(text:string):string{
  return text.trim();
}

function capitalize(text:string):string{
  return text.charAt(0).toUpperCase()+text.substring(1).toLowerCase();
}

function formatDisplayName(firstName:string,lastName:string):string{
  return `${capitalize(cleanText(firstName))} ${capitalize(cleanText(lastName))}`;
}
