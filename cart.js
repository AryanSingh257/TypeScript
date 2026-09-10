"use strict";
function calculateSubtotal(items) {
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        sum += item.price * item.quantity;
    }
    return sum;
}
function calculateDiscount(subtotal, discountPercent) {
    return subtotal * discountPercent / 100;
}
function calculateTax(amountAfterDiscount, taxPercent) {
    return amountAfterDiscount * taxPercent / 100;
}
function createCartSummary(items, discountPercent, taxPercent) {
    const subtotal = calculateSubtotal(items);
    const discount = calculateDiscount(subtotal, discountPercent);
    const tax = calculateTax(subtotal - discount, taxPercent);
    return {
        subtotal: subtotal,
        discount: discount,
        tax: tax,
        total: subtotal - discount + tax,
    };
}
