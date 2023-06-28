import type { MealType } from '@prisma/client'

import {
  mealTypes,
  mealType,
  createMealType,
  updateMealType,
  deleteMealType,
} from './mealTypes'
import type { StandardScenario } from './mealTypes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('mealTypes', () => {
  scenario('returns all mealTypes', async (scenario: StandardScenario) => {
    const result = await mealTypes()

    expect(result.length).toEqual(Object.keys(scenario.mealType).length)
  })

  scenario('returns a single mealType', async (scenario: StandardScenario) => {
    const result = await mealType({ id: scenario.mealType.one.id })

    expect(result).toEqual(scenario.mealType.one)
  })

  scenario('creates a mealType', async () => {
    const result = await createMealType({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a mealType', async (scenario: StandardScenario) => {
    const original = (await mealType({
      id: scenario.mealType.one.id,
    })) as MealType
    const result = await updateMealType({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a mealType', async (scenario: StandardScenario) => {
    const original = (await deleteMealType({
      id: scenario.mealType.one.id,
    })) as MealType
    const result = await mealType({ id: original.id })

    expect(result).toEqual(null)
  })
})
