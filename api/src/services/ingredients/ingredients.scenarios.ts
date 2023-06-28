import type { Prisma, Ingredient } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.IngredientCreateArgs>({
  ingredient: {
    one: { data: { pantryItem: true, name: 'String', unit: 'String' } },
    two: { data: { pantryItem: true, name: 'String', unit: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Ingredient, 'ingredient'>
