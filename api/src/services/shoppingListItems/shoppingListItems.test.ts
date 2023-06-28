import type { ShoppingListItem } from '@prisma/client'

import {
  shoppingListItems,
  shoppingListItem,
  createShoppingListItem,
  updateShoppingListItem,
  deleteShoppingListItem,
} from './shoppingListItems'
import type { StandardScenario } from './shoppingListItems.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('shoppingListItems', () => {
  scenario(
    'returns all shoppingListItems',
    async (scenario: StandardScenario) => {
      const result = await shoppingListItems()

      expect(result.length).toEqual(
        Object.keys(scenario.shoppingListItem).length
      )
    }
  )

  scenario(
    'returns a single shoppingListItem',
    async (scenario: StandardScenario) => {
      const result = await shoppingListItem({
        id: scenario.shoppingListItem.one.id,
      })

      expect(result).toEqual(scenario.shoppingListItem.one)
    }
  )

  scenario('creates a shoppingListItem', async (scenario: StandardScenario) => {
    const result = await createShoppingListItem({
      input: {
        shoppingListId: scenario.shoppingListItem.two.shoppingListId,
        ingredientId: scenario.shoppingListItem.two.ingredientId,
        amount: 623339.4746348897,
      },
    })

    expect(result.shoppingListId).toEqual(
      scenario.shoppingListItem.two.shoppingListId
    )
    expect(result.ingredientId).toEqual(
      scenario.shoppingListItem.two.ingredientId
    )
    expect(result.amount).toEqual(623339.4746348897)
  })

  scenario('updates a shoppingListItem', async (scenario: StandardScenario) => {
    const original = (await shoppingListItem({
      id: scenario.shoppingListItem.one.id,
    })) as ShoppingListItem
    const result = await updateShoppingListItem({
      id: original.id,
      input: { amount: 8919261.575314444 },
    })

    expect(result.amount).toEqual(8919261.575314444)
  })

  scenario('deletes a shoppingListItem', async (scenario: StandardScenario) => {
    const original = (await deleteShoppingListItem({
      id: scenario.shoppingListItem.one.id,
    })) as ShoppingListItem
    const result = await shoppingListItem({ id: original.id })

    expect(result).toEqual(null)
  })
})
