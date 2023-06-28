import type { Prisma, Recipe } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RecipeCreateArgs>({
  recipe: {
    one: {
      data: {
        name: 'String',
        prep_time: 6720141,
        cook_time: 8719944,
        servings: 1842623,
        intro: 'String',
        description: 'String',
        tags: 'String',
      },
    },
    two: {
      data: {
        name: 'String',
        prep_time: 7053481,
        cook_time: 7907890,
        servings: 7461650,
        intro: 'String',
        description: 'String',
        tags: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Recipe, 'recipe'>
