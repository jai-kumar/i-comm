const fs = require('fs');

function getAllProducts() {
  let allData = fs.readFileSync('data.json');
  allData = JSON.parse(allData);
  let allProducts = allData?.products;
  return allProducts || [];
}

module.exports = {
  getAllProducts: getAllProducts
};