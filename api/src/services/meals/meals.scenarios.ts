import type { Prisma, Meal } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.MealCreateArgs>({
  meal: {
    one: {
      data: {
        date: '2023-06-28T00:24:01.265Z',
        description: 'String',
        mealType: { create: { name: 'String' } },
        recipe: {
          create: {
            name: 'String',
            prep_time: 5154059,
            cook_time: 8165617,
            servings: 3738357,
            intro: 'String',
            description: 'String',
            tags: 'String',
          },
        },
      },
    },
    two: {
      data: {
        date: '2023-06-28T00:24:01.265Z',
        description: 'String',
        mealType: { create: { name: 'String' } },
        recipe: {
          create: {
            name: 'String',
            prep_time: 5426236,
            cook_time: 2981173,
            servings: 7438121,
            intro: 'String',
            description: 'String',
            tags: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Meal, 'meal'>
