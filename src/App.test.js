const {calCounts, getColorFromTimesofAccess} = require('./functions/functions');


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Map />, div);
// });

//test calTimes function to calculate the total access time of a plant
describe("Calculate the total access times", () => {
    var access = [{accessDate: "10/10/19", cnt: 1}];
    test("Total access times should be 1, when the accesse date is greater than required date", () => {
        expect(calCounts(access, Date.parse("1900-01-01"))).toBe(1);
    });
    test("Total access times should be 0, if all time span selected", () => {
      expect(calCounts(access, Date.parse("2020-10-0"))).toBe(0);
  });
});

//test getColorFromTimesofAccess function to get the color of marker from its plant's access times
describe("Test the color of makers", () => {
    var max = 50;
    test("marker should be yellow when count is less than 20%", () => {
      expect(getColorFromTimesofAccess(5, max)).toBe("blue");
    });
    test("marker should be orange when count is less than 50%", () => {
        expect(getColorFromTimesofAccess(10, max)).toBe("yellow");
      });
    test("marker should be red when count is less than 80%", () => {
        expect(getColorFromTimesofAccess(30, max)).toBe("orange");
      })
    test("marker should be blue when count is greater than 80%", () => {
        expect(getColorFromTimesofAccess(50, max)).toBe("red");
      });
});
