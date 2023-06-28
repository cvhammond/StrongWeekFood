import type { Meal } from '@prisma/client'

import { meals, meal, createMeal, updateMeal, deleteMeal } from './meals'
import type { StandardScenario } from './meals.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('meals', () => {
  scenario('returns all meals', async (scenario: StandardScenario) => {
    const result = await meals()

    expect(result.length).toEqual(Object.keys(scenario.meal).length)
  })

  scenario('returns a single meal', async (scenario: StandardScenario) => {
    const result = await meal({ id: scenario.meal.one.id })

    expect(result).toEqual(scenario.meal.one)
  })

  scenario('creates a meal', async (scenario: StandardScenario) => {
    const result = await createMeal({
      input: {
        mealTypeId: scenario.meal.two.mealTypeId,
        date: '2023-06-28T00:24:01.239Z',
        description: 'String',
        recipeId: scenario.meal.two.recipeId,
      },
    })

    expect(result.mealTypeId).toEqual(scenario.meal.two.mealTypeId)
    expect(result.date).toEqual(new Date('2023-06-28T00:24:01.239Z'))
    expect(result.description).toEqual('String')
    expect(result.recipeId).toEqual(scenario.meal.two.recipeId)
  })

  scenario('updates a meal', async (scenario: StandardScenario) => {
    const original = (await meal({ id: scenario.meal.one.id })) as Meal
    const result = await updateMeal({
      id: original.id,
      input: { date: '2023-06-29T00:24:01.239Z' },
    })

    expect(result.date).toEqual(new Date('2023-06-29T00:24:01.239Z'))
  })

  scenario('deletes a meal', async (scenario: StandardScenario) => {
    const original = (await deleteMeal({ id: scenario.meal.one.id })) as Meal
    const result = await meal({ id: original.id })

    expect(result).toEqual(null)
  })
})
