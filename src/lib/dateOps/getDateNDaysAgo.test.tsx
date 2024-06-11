import { describe, expectTypeOf, vi } from 'vitest'
import { getDateNDaysAgo } from './dateOps'

describe('getDateNDaysAgo', () => {
  beforeEach(() => {
    const date = new Date(2020, 10, 10)
    vi.useFakeTimers()
    vi.setSystemTime(date)
  })

  test('Returns date object', () => {
    const dateNDaysAgo = getDateNDaysAgo(0)
    expectTypeOf(dateNDaysAgo).toEqualTypeOf(new Date())
  })

  test('For 0 days returns the current date', () => {
    const dateNDaysAgo = getDateNDaysAgo(0)
    expect(dateNDaysAgo.getTime()).equal(new Date().getTime())
  })

  test('For a positive amount days returns a lower date', () => {
    const dateNDaysAgo = getDateNDaysAgo(10)
    expect(dateNDaysAgo.getTime()).lessThan(new Date().getTime())
  })

  test('For a negative amount of days returns the current date', () => {
    const dateNDaysAgo = getDateNDaysAgo(-10)
    expect(dateNDaysAgo.getTime()).equal(new Date().getTime())
  })

  test('Return date correctly within a month', () => {
    const date2DaysAgo = getDateNDaysAgo(2)
    expect(date2DaysAgo.getTime()).equal(new Date(2020, 10, 8).getTime())
  })

  test('Return date correctly when the number of days crosses to the previous month', () => {
    const date11DaysAgo = getDateNDaysAgo(10)
    expect(date11DaysAgo.getTime()).equal(new Date(2020, 9, 31).getTime())
  })

  afterEach(() => {
    vi.useRealTimers()
  })
})
