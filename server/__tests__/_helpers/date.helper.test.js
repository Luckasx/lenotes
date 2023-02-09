const helper = require("../../_helpers/date.helper");

describe("Testing the Date Helper", () => {
  test("Add Hours", () => {
    jest.useFakeTimers().setSystemTime(new Date("2023-01-01 00:00:00"));
    
    let now = new Date();

    let new_dt = helper.addHours({dt: now, hours: 1});
    
    expect(new_dt.getHours()).toBe(1);

    new_dt = helper.addHours({dt: now, hours: -1});

    expect(new_dt.getHours()).toBe(23);

    new_dt = helper.addHours({dt: null, hours: -1});

    expect(new_dt.getHours()).toBe(NaN);

  });
});
