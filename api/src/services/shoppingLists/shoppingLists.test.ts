import type { ShoppingList } from '@prisma/client'

import {
  shoppingLists,
  shoppingList,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
} from './shoppingLists'
import type { StandardScenario } from './shoppingLists.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('shoppingLists', () => {
  scenario('returns all shoppingLists', async (scenario: StandardScenario) => {
    const result = await shoppingLists()

    expect(result.length).toEqual(Object.keys(scenario.shoppingList).length)
  })

  scenario(
    'returns a single shoppingList',
    async (scenario: StandardScenario) => {
      const result = await shoppingList({ id: scenario.shoppingList.one.id })

      expect(result).toEqual(scenario.shoppingList.one)
    }
  )

  scenario('creates a shoppingList', async () => {
    const result = await createShoppingList({
      input: {
        startDate: '2023-06-28T00:24:47.297Z',
        endDate: '2023-06-28T00:24:47.297Z',
        numberOfPeople: 4853314,
      },
    })

    expect(result.startDate).toEqual(new Date('2023-06-28T00:24:47.297Z'))
    expect(result.endDate).toEqual(new Date('2023-06-28T00:24:47.297Z'))
    expect(result.numberOfPeople).toEqual(4853314)
  })

  scenario('updates a shoppingList', async (scenario: StandardScenario) => {
    const original = (await shoppingList({
      id: scenario.shoppingList.one.id,
    })) as ShoppingList
    const result = await updateShoppingList({
      id: original.id,
      input: { startDate: '2023-06-29T00:24:47.297Z' },
    })

    expect(result.startDate).toEqual(new Date('2023-06-29T00:24:47.297Z'))
  })

  scenario('deletes a shoppingList', async (scenario: StandardScenario) => {
    const original = (await deleteShoppingList({
      id: scenario.shoppingList.one.id,
    })) as ShoppingList
    const result = await shoppingList({ id: original.id })

    expect(result).toEqual(null)
  })
})
