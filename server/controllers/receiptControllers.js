const receiptController = {

    async uploadReceipt(req, res, next) {

  try {
     const form = new FormData();
    form.append('refresh', 'false');
    form.append('incognito', 'false');
    form.append('extractTime', 'false');
    form.append('extractLineItems', 'true');
    form.append('file', req.body);

    const options = {
      method: 'POST',
      headers: {accept: 'application/json', apikey: 'b6abedc0f43c11ee9433edbb2578dfab'}
    };

  options.body = form;

    const response = await fetch('https://api.taggun.io/api/receipt/v1/simple/file', options);
    const parsedData = await response.json();
    const productArray = parsedData.entities.productLineItems;
      // for each element in ProductArray
        // extract name
          // data.name.data
        // extract price
          // data.totalPrice.data
    console.log(productArray);
    res.locals.array = productArray;
    return next();
  } catch (err) {
      return next({log: 'Problem encountered fetching data from API', message: 'Could not retrieve receipt data'})
  }
      }
};

export default receiptController;