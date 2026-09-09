"use strict";
function calculateDiscount(price, discountPercent) {
    return (price * discountPercent) / 100;
}
function calculateTax(priceAfterDiscount, taxPercent) {
    return (priceAfterDiscount * taxPercent) / 100;
}
function calculateFinalPrice(price, discountPercent, taxPercent) {
    const discount = calculateDiscount(price, discountPercent);
    const priceAfterDiscount = price - discount;
    return price - discount + calculateTax(priceAfterDiscount, taxPercent);
}
function createPriceSummary(price, discountPercent, taxPercent) {
    const discount = calculateDiscount(price, discountPercent);
    const priceAfterDiscount = price - discount;
    return {
        price: price,
        discount: discount,
        tax: calculateTax(priceAfterDiscount, taxPercent),
        finalPrice: calculateFinalPrice(price, discountPercent, taxPercent),
    };
}
