type Price= {
  price: number,
  discount: number,
  tax: number,
  finalPrice: number,
}

function calculateDiscount(price:number,discountPercent:number):number{
  return (price*discountPercent)/100;
}


function calculateTax(priceAfterDiscount:number,taxPercent:number):number{
  return (priceAfterDiscount*taxPercent)/100;
}


function calculateFinalPrice(price:number,discountPercent:number,taxPercent:number):number{
  const discount:number = calculateDiscount(price,discountPercent);
  const priceAfterDiscount:number = price - discount;
  return price-discount+calculateTax(priceAfterDiscount,taxPercent);
}

function createPriceSummary(price:number,discountPercent:number,taxPercent:number):Price{
  const discount:number = calculateDiscount(price,discountPercent);
  const priceAfterDiscount:number = price - discount;
  return {
    price: price,
    discount: discount,
    tax: calculateTax(priceAfterDiscount,taxPercent),
    finalPrice: calculateFinalPrice(price,discountPercent,taxPercent),
  }
}
