import type { Prisma, RecipeIngredient } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RecipeIngredientCreateArgs>({
  recipeIngredient: {
    one: {
      data: {
        amount: 2809401.844434922,
        recipe: {
          create: {
            name: 'String',
            prep_time: 1702193,
            cook_time: 3272183,
            servings: 9019097,
            intro: 'String',
            description: 'String',
            tags: 'String',
          },
        },
        ingredient: {
          create: { pantryItem: true, name: 'String', unit: 'String' },
        },
      },
    },
    two: {
      data: {
        amount: 7805185.365316414,
        recipe: {
          create: {
            name: 'String',
            prep_time: 5271493,
            cook_time: 2728801,
            servings: 5348195,
            intro: 'String',
            description: 'String',
            tags: 'String',
          },
        },
        ingredient: {
          create: { pantryItem: true, name: 'String', unit: 'String' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  RecipeIngredient,
  'recipeIngredient'
>
