import { getDifferenceInHours } from './dateOps'

test('Returns a positive amount when dates are ordered', () => {
  const date1 = new Date(2020, 10, 11, 20, 0, 0)
  const date2 = new Date(2020, 10, 12, 20, 0, 0)
  const diff = getDifferenceInHours(date1, date2)
  expect(diff).greaterThan(0)
})

test('Returns a negative amount when dates are reversed', () => {
  const date1 = new Date(2020, 10, 11, 20, 0, 0)
  const date2 = new Date(2020, 10, 12, 20, 0, 0)
  const diff = getDifferenceInHours(date2, date1)
  expect(diff).lessThan(0)
})

test('Returns the correct amount for a difference of hours in the same day', () => {
  const date1 = new Date(2020, 10, 12, 3, 0, 0)
  const date2 = new Date(2020, 10, 12, 20, 0, 0)
  const diff = getDifferenceInHours(date1, date2)
  expect(diff).equal(17)
})

test('Returns the correct amount for a difference of hours in different days', () => {
  const date1 = new Date(2020, 10, 11, 20, 0, 0)
  const date2 = new Date(2020, 10, 12, 20, 0, 0)
  const diff = getDifferenceInHours(date1, date2)
  expect(diff).equal(24)
})

test('Returns the correct amount for decimal difference', () => {
  const date1 = new Date(2020, 10, 12, 3, 0, 0)
  const date2 = new Date(2020, 10, 12, 4, 30, 0)
  const diff = getDifferenceInHours(date1, date2)
  expect(diff).closeTo(1.5, 0.01)
})
