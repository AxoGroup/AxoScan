const searchArray = {
  searched(req, res, next) {
    const lineItems = res.locals.array;
    if (lineItems === undefined) return next();
    const aggregatedData = lineItems.reduce((acc, el) => {  // Use reduce to combine the data
      const name = el.data.name.data; 
      const regex = /[^a-z]/gi;
      const isLettersOnlyName = name.replace(regex, '');
      const value = Number(el.data.totalPrice.data); // Assuming this is a string that needs to be converted to a number

      if (acc[isLettersOnlyName]) {
        acc[isLettersOnlyName] += value; // If the name already exists, add the value
      } else {
        acc[isLettersOnlyName] = value; // Otherwise, initialize it with the value
      }

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
