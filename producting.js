"use strict";
function filterByCategory(products, category) {
    return products.filter((i) => {
        return i.category === category;
    });
}
function filterByMaxPrice(products, maxPrice) {
    return products.filter((i) => {
        return i.price <= maxPrice;
    });
}
function getInStockProducts(products) {
    return products.filter((i) => {
        return i.inStock;
    });
}
function findProductById(products, productId) {
    return products.find((val) => {
        return val.id === productId;
    });
}
function searchProducts(products, searchText) {
    return products.filter((val) => {
        return val.name.includes(searchText);
    });
}
