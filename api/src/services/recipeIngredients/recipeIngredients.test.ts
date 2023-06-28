import type { RecipeIngredient } from '@prisma/client'

import {
  recipeIngredients,
  recipeIngredient,
  createRecipeIngredient,
  updateRecipeIngredient,
  deleteRecipeIngredient,
} from './recipeIngredients'
import type { StandardScenario } from './recipeIngredients.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('recipeIngredients', () => {
  scenario(
    'returns all recipeIngredients',
    async (scenario: StandardScenario) => {
      const result = await recipeIngredients()

      expect(result.length).toEqual(
        Object.keys(scenario.recipeIngredient).length
      )
    }
  )

  scenario(
    'returns a single recipeIngredient',
    async (scenario: StandardScenario) => {
      const result = await recipeIngredient({
        id: scenario.recipeIngredient.one.id,
      })

      expect(result).toEqual(scenario.recipeIngredient.one)
    }
  )

  scenario('creates a recipeIngredient', async (scenario: StandardScenario) => {
    const result = await createRecipeIngredient({
      input: {
        recipeId: scenario.recipeIngredient.two.recipeId,
        ingredientId: scenario.recipeIngredient.two.ingredientId,
        amount: 8909982.138279188,
      },
    })

    expect(result.recipeId).toEqual(scenario.recipeIngredient.two.recipeId)
    expect(result.ingredientId).toEqual(
      scenario.recipeIngredient.two.ingredientId
    )
    expect(result.amount).toEqual(8909982.138279188)
  })

  scenario('updates a recipeIngredient', async (scenario: StandardScenario) => {
    const original = (await recipeIngredient({
      id: scenario.recipeIngredient.one.id,
    })) as RecipeIngredient
    const result = await updateRecipeIngredient({
      id: original.id,
      input: { amount: 4743374.4599818345 },
    })

    expect(result.amount).toEqual(4743374.4599818345)
  })

  scenario('deletes a recipeIngredient', async (scenario: StandardScenario) => {
    const original = (await deleteRecipeIngredient({
      id: scenario.recipeIngredient.one.id,
    })) as RecipeIngredient
    const result = await recipeIngredient({ id: original.id })

    expect(result).toEqual(null)
  })
})
