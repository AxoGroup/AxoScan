const searchArray = {

searched(req, res, next) {
   const array = res.locals.array;

const searchName = array.map(el => el.data.name.data);
const searchPrice = array.map(el => el.data.totalPrice.data);
 
   const resSearched = {};
  // functionality right here
  searchName.forEach((key, index) => {
    resSearched[key] = searchPrice[index]
});
console.log(resSearched);

res.locals.object = resSearched;
return next();
}
}

export default searchArray;