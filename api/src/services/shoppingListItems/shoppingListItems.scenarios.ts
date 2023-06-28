import type { Prisma, ShoppingListItem } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ShoppingListItemCreateArgs>({
  shoppingListItem: {
    one: {
      data: {
        amount: 8666179.078787364,
        shoppingList: {
          create: {
            startDate: '2023-06-28T00:24:40.839Z',
            endDate: '2023-06-28T00:24:40.839Z',
            numberOfPeople: 4730076,
          },
        },
        ingredient: {
          create: { pantryItem: true, name: 'String', unit: 'String' },
        },
      },
    },
    two: {
      data: {
        amount: 7813662.236431795,
        shoppingList: {
          create: {
            startDate: '2023-06-28T00:24:40.839Z',
            endDate: '2023-06-28T00:24:40.839Z',
            numberOfPeople: 2885915,
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
  ShoppingListItem,
  'shoppingListItem'
>
