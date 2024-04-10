const searchArray = {
  searched(req, res, next) {
    const array = res.locals.array;

    const aggregatedData = array.reduce((acc, el) => {
      const name = el.data.name.data;
      const value = Number(el.data.totalPrice.data); // Assuming this is a string that needs to be converted to a number

      if (acc[name]) {
        acc[name] += value; // If the name already exists, add the value
      } else {
        acc[name] = value; // Otherwise, initialize it with the value
      }

      return acc;
    }, {});
    console.log('obj', aggregatedData);
    const searchNameAndValue = Object.entries(aggregatedData).map(([type, value]) => ({
      type,
      value,
    }));
    res.locals.array = searchNameAndValue;
    return next();
  },
};

export default searchArray;
