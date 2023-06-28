import type { Ingredient } from '@prisma/client'

import {
  ingredients,
  ingredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from './ingredients'
import type { StandardScenario } from './ingredients.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('ingredients', () => {
  scenario('returns all ingredients', async (scenario: StandardScenario) => {
    const result = await ingredients()

    expect(result.length).toEqual(Object.keys(scenario.ingredient).length)
  })

  scenario(
    'returns a single ingredient',
    async (scenario: StandardScenario) => {
      const result = await ingredient({ id: scenario.ingredient.one.id })

      expect(result).toEqual(scenario.ingredient.one)
    }
  )

  scenario('creates a ingredient', async () => {
    const result = await createIngredient({
      input: { pantryItem: true, name: 'String', unit: 'String' },
    })

    expect(result.pantryItem).toEqual(true)
    expect(result.name).toEqual('String')
    expect(result.unit).toEqual('String')
  })

  scenario('updates a ingredient', async (scenario: StandardScenario) => {
    const original = (await ingredient({
      id: scenario.ingredient.one.id,
    })) as Ingredient
    const result = await updateIngredient({
      id: original.id,
      input: { pantryItem: false },
    })

    expect(result.pantryItem).toEqual(false)
  })

  scenario('deletes a ingredient', async (scenario: StandardScenario) => {
    const original = (await deleteIngredient({
      id: scenario.ingredient.one.id,
    })) as Ingredient
    const result = await ingredient({ id: original.id })

    expect(result).toEqual(null)
  })
})
