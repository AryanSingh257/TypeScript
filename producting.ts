type product = {
  id: number,
  name: string,
  category: string,
  price: number,
  inStock: boolean,
}

function filterByCategory(products:product[],category:string):product[]{
  return products.filter((i) => {
    return i.category === category;
  });
}

function filterByMaxPrice(products:product[],maxPrice:number):product[]{
  return products.filter((i) => {
    return i.price<=maxPrice;
  });
}

function getInStockProducts(products:product[]):product[]{
  return products.filter((i) => {
    return i.inStock;
  });
}

function findProductById(products:product[],productId:number):product | undefined{
  return products.find((val) => {
    return val.id === productId;
  });
}

function searchProducts(products:product[],searchText:string):product[]{
  return products.filter((val) => {
    return val.name.includes(searchText);
  });
}
