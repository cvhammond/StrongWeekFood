import type { Recipe } from '@prisma/client'

import {
  recipes,
  recipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from './recipes'
import type { StandardScenario } from './recipes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('recipes', () => {
  scenario('returns all recipes', async (scenario: StandardScenario) => {
    const result = await recipes()

    expect(result.length).toEqual(Object.keys(scenario.recipe).length)
  })

  scenario('returns a single recipe', async (scenario: StandardScenario) => {
    const result = await recipe({ id: scenario.recipe.one.id })

    expect(result).toEqual(scenario.recipe.one)
  })

  scenario('creates a recipe', async () => {
    const result = await createRecipe({
      input: {
        name: 'String',
        prep_time: 931017,
        cook_time: 2001032,
        servings: 6212356,
        intro: 'String',
        description: 'String',
        tags: 'String',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.prep_time).toEqual(931017)
    expect(result.cook_time).toEqual(2001032)
    expect(result.servings).toEqual(6212356)
    expect(result.intro).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.tags).toEqual('String')
  })

  scenario('updates a recipe', async (scenario: StandardScenario) => {
    const original = (await recipe({ id: scenario.recipe.one.id })) as Recipe
    const result = await updateRecipe({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a recipe', async (scenario: StandardScenario) => {
    const original = (await deleteRecipe({
      id: scenario.recipe.one.id,
    })) as Recipe
    const result = await recipe({ id: original.id })

    expect(result).toEqual(null)
  })
})
