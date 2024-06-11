import { expect } from 'vitest'
import { calculateDays } from './days'

test('retruns the correct number of days for 1 exact day in seconds', () => {
  const result = calculateDays(86400) // 1 day
  expect(result).toBe(1)
})

test('returns 0 for less than one day in seconds', () => {
  const result = calculateDays(86399)
  expect(result).toBe(0)
})

test('handles edge case of exactly zero seconds', () => {
  const result = calculateDays(0)
  expect(result).toBe(0)
})

test('handles negative input by returning negative number of days', () => {
  const result = calculateDays(-86400) // -1 day
  expect(result).toBe(-1)
})

test('returns the correct number of days for multiple days in seconds', () => {
  const result = calculateDays(172800) // 2 days
  expect(result).toBe(2)
})
