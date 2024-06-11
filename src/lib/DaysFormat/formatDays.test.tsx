import { formatDays } from './days'

//For these tests the timezone is configured as GMT-6

test('formats a typical date correctly', () => {
  const result = formatDays('2023-06-10T16:00:00Z')
  expect(result).equal('10/06/2023')
})

test('handles dates at the beginning of the month correctly', () => {
  const result = formatDays('2023-07-01T00:00:00Z')
  expect(result).equal('30/06/2023')
})

test('handles dates at the beginning of the year correctly', () => {
  const result = formatDays('2023-01-01T00:00:00Z')
  expect(result).equal('31/12/2022')
})

test('handles invalid date strings by returning "Invalid Date"', () => {
  const result = formatDays('invalid-date')
  expect(result).equal('invalid date')
})
