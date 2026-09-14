type Order = {
  id: string,
  customer: {
    name: string,
    email: string,
  },
  payment: {
    status: string
  },
  shipping: {
    status: string,
    estimatedDelivery: string,
  },
  items: { name: string, quantity: number,}[],
}

type OrderSummary = {
  id: string,
  customerName: string,
  paid: boolean,
  shipped: boolean,
  itemCount: number,
  deliveryMessage: string,
  needsAttention: boolean
}

function isPaid(order:Order):boolean{
  return order.payment.status == "paid";
}

function hasShipped(order:Order):boolean{
  return order.shipping.status == "shipped";
}

function getDeliveryMessage(order:Order):string{
  if(hasShipped(order)){
    return `Order shipped. Estimated time: ${order.shipping.estimatedDelivery}.`;
  }
  return "Order has not shipped yet."
}

function needsAttention(order:Order):boolean{
  return !hasShipped(order) || !isPaid(order);
}

function createOrderSummary(order:Order):OrderSummary{
  return {
    id: order.id,
    customerName: order.customer.name,
    paid: isPaid(order),
    shipped: hasShipped(order),
    itemCount: order.items.reduce((val,i)=>{
      return { name: "hello",quantity: val.quantity+i.quantity}
    }).quantity,
    deliveryMessage: getDeliveryMessage(order),
    needsAttention: needsAttention(order),
  }
}
