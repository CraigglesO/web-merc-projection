import { toID, fromID } from '../src/mercID.js'
import { describe, test, it, expect } from 'vitest'

describe('managing tile x-y-z to/from ID', () => {
  it('toID', () => {
    expect(toID(0, 0, 0)).toEqual(0n)
    expect(toID(1, 0, 0)).toEqual(1n)
  })

  it('fromID', () => {
    expect(fromID(0n)).toEqual([0, 0, 0])
    expect(fromID(1n)).toEqual([1, 0, 0])
  })

  it('toID and fromID random', () => {
    expect(fromID(toID(0, 0, 0))).toEqual([0, 0, 0])
    expect(fromID(toID(1, 0, 0))).toEqual([1, 0, 0])
    expect(fromID(toID(1, 1, 0))).toEqual([1, 1, 0])
    expect(fromID(toID(1, 1, 1))).toEqual([1, 1, 1])
    expect(fromID(toID(20, 1048575, 1048575))).toEqual([20, 1048575, 1048575])
  })
})

test('toID and fromID for all zooms 1-5', (a) => {
  const idCache = new Set()
  for (let z = 1; z <= 5; z++) {
    for (let x = 0; x < 2 ** z; x++) {
      for (let y = 0; y < 2 ** z; y++) {
        const id = toID(z, x, y)
        if (idCache.has(id)) throw new Error(`duplicate id ${id}`)
        idCache.add(id)
        expect(fromID(id)).toEqual([z, x, y])
      }
    }
  }
})
