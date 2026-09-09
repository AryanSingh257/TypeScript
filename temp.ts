function celsiusToFahrenheit(celsius:number):number{
  return celsius*1.8+32;
}

function fahrenheitToCelsius(fahrenheit:number):number{
  return (fahrenheit-32)*(5/9);
}

function formatTemperature(value:number,unit:string):string{
  return `${value} ${unit.toUpperCase()}`;
}
