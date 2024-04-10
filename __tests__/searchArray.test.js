// const searchArray = require('../server/controllers/searchArray');
import searchArray from "../server/controllers/searchArray";

describe('searchArray tests', () => {
  describe('functionality tests', () => { 
    test('when the input array is empty, "lineItems" is set to an empty array and next is returned', () => {
      const res = {locals: { array : []}}
      const next = jest.fn()
      searchArray.searched({}, res, next);
        expect(res.locals.array).toEqual([]);
        expect(next).toHaveBeenCalled();
    });
    test('when the input array has one element, the resulting array of objects is aggregated correctly', () => {
      const res = {locals: { array : [
        {
          "data": {
            "quantity": {
              "data": 1,
              "regions": [],
              "text": "1"
            },
            "unitPrice": {
              "data": 3.27,
              "regions": [],
              "text": "3.27"
            },
            "totalPrice": {
              "data": 3.27,
              "regions": [],
              "text": "3.27"
            },
            "name": {
              "data": "POTATOES 892867001950",
              "regions": [],
              "text": "POTATOES 892867001950"
            }
          },
        }]
      }}
      const next = jest.fn()
      searchArray.searched({}, res, next);
        expect(res.locals.array).toEqual([{type: 'POTATOES', value: 3.27}]);
        expect(next).toHaveBeenCalled();
    });
    test('when the input array has multiple uniquely named elements, the resulting array of objects is aggregated correctly', () => {
      const res = {locals: { array : [
        {
          "data": {
            "quantity": {
              "data": 1,
              "regions": [],
              "text": "1"
            },
            "unitPrice": {
              "data": 3.27,
              "regions": [],
              "text": "3.27"
            },
            "totalPrice": {
              "data": 3.27,
              "regions": [],
              "text": "3.27"
            },
            "name": {
              "data": "POTATOES 892867001950",
              "regions": [],
              "text": "POTATOES 892867001950"
            }
          },
        },
        {
          "data": {
            "quantity": {
              "data": 1,
              "regions": [],
              "text": "1"
            },
            "unitPrice": {
              "data": 3.28,
              "regions": [],
              "text": "3.28"
            },
            "totalPrice": {
              "data": 3.28,
              "regions": [],
              "text": "3.28"
            },
            "name": {
              "data": "FIGS 892867001950",
              "regions": [],
              "text": "FIGS 892867001950"
            }
          },
        }]
      }}
      const next = jest.fn()
      searchArray.searched({}, res, next);
        expect(res.locals.array).toEqual([{type: 'POTATOES', value: 3.27}, {type: 'FIGS', value: 3.28}]);
        expect(next).toHaveBeenCalled();
    });
    test('when the input array has duplicate named elements, the resulting array of objects is aggregated correctly', () => {
      const res = {locals: { array : [
        {
          "data": {
            "quantity": {
              "data": 1,
              "regions": [],
              "text": "1"
            },
            "unitPrice": {
              "data": 3.27,
              "regions": [],
              "text": "3.27"
            },
            "totalPrice": {
              "data": 3.27,
              "regions": [],
              "text": "3.27"
            },
            "name": {
              "data": "POTATOES 892867001950",
              "regions": [],
              "text": "POTATOES 892867001950"
            }
          },
        },
        {
          "data": {
            "quantity": {
              "data": 1,
              "regions": [],
              "text": "1"
            },
            "unitPrice": {
              "data": 3.27,
              "regions": [],
              "text": "3.27"
            },
            "totalPrice": {
              "data": 3.27,
              "regions": [],
              "text": "3.27"
            },
            "name": {
              "data": "POTATOES 892867001950",
              "regions": [],
              "text": "POTATOES 892867001950"
            }
          },
        }]
      }}
      const next = jest.fn()
      searchArray.searched({}, res, next);
        expect(res.locals.array).toEqual([{type: 'POTATOES', value: 6.54}]);
        expect(next).toHaveBeenCalled();
    });
    test('the type of "total price" is correctly converted from a string to a number', () => {
      const res = {locals: { array : [
        {
          "data": {
            "quantity": {
              "data": 1,
              "regions": [],
              "text": "1"
            },
            "unitPrice": {
              "data": 3.27,
              "regions": [],
              "text": "3.27"
            },
            "totalPrice": {
              "data": 3.27,
              "regions": [],
              "text": "3.27"
            },
            "name": {
              "data": "POTATOES 892867001950",
              "regions": [],
              "text": "POTATOES 892867001950"
            }
          },
        }]
      }}
      const next = jest.fn()
      searchArray.searched({}, res, next);
        expect(typeof(res.locals.array[0].value)).toEqual('number');
        expect(next).toHaveBeenCalled();
    });
    test('handles large numbers of elements with high totalPrice values', () => {
      const largeArray = new Array(10000).fill().map((_, index) => ({
        data: {
          name: { data: `Product${index % 10}` }, // Reuse names to ensure aggregation
          totalPrice: { data: `${(index % 10) * 1000000000}` }, // Large values
        },
      }));
    
      // Mock `res` and `next` for your middleware
      const res = { locals: { array: largeArray } };
      const next = jest.fn();
    
      // Call your middleware function
      searchArray.searched({}, res, next);
    
      // Expect next to have been called to indicate success
      expect(next).toHaveBeenCalled();
      
    });
  }),
  describe('handles errors', () => { 
    test('when error is thrown, next is called with an error object', () => {
      
  })

});
