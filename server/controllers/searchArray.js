const searchArray = {
  searched(req, res, next) {
    const lineItems = res.locals.array;
    if (lineItems === undefined) return next();
    const cleanName = (name) => name.replace(/[^a-z]/gi, ''); // removes non-letters from item name
    const aggregatedData = lineItems.reduce((acc, el) => {  // Use reduce to combine the data
      const name = cleanName(el.data.name.data); 
      const value = el.data.totalPrice.data; // Assuming this is a string that needs to be converted to a number
      acc[name] = (acc[name] || 0) + (value >= 0 ? value: 0); // If the name already exists, add the value, otherwise, initialize it with the value
      return acc;
    }, {});
    // console.log('obj', aggregatedData);
    const searchNameAndValue = Object.entries(aggregatedData).map(([type, value]) => ({   // Convert the object to an array of objects with the correct keys and values 
      type,
      value,
    }));
    res.locals.array = searchNameAndValue;
    return next();
  },
};

export default searchArray;
