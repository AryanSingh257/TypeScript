type cartSummary = {
  subtotal: number,
  discount: number,
  tax: number,
  total: number,
};

type cart = {
  name: string,
  price: number,
  quantity: number,
};

function calculateSubtotal(items:cart[]):number{
  let sum=0;
  for (let i=0;i<items.length;i++){
    let item = items[i];
    sum+=item.price*item.quantity;
  }
  return sum;
}

function calculateDiscount(subtotal:number,discountPercent:number):number{
  return subtotal*discountPercent/100;
}

function calculateTax(amountAfterDiscount:number,taxPercent:number):number{
  return amountAfterDiscount*taxPercent/100;
}

function createCartSummary(items:cart[],discountPercent:number,taxPercent:number):cartSummary{
  const subtotal:number = calculateSubtotal(items);
  const discount:number = calculateDiscount(subtotal,discountPercent);
  const tax:number = calculateTax(subtotal-discount,taxPercent);
  return {
    subtotal: subtotal,
    discount: discount,
    tax: tax,
    total: subtotal-discount+tax,
  }
}
