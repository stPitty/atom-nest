export const lastWeekDateFrom = new Date(
  new Date().setDate(new Date().getDate() - 7),
).toISOString();

export const lastMonthDateFrom = new Date(
  new Date().setMonth(new Date().getMonth() - 1),
).toISOString();
export const allTimeDateFrom = new Date('2020-01-01').toISOString();

export const getCurrentISODate = (): string =>
  new Date(new Date().getTime() + 3 * 60 * 60 * 1000).toISOString();
