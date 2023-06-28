import type { Prisma, ShoppingList } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ShoppingListCreateArgs>({
  shoppingList: {
    one: {
      data: {
        startDate: '2023-06-28T00:24:47.310Z',
        endDate: '2023-06-28T00:24:47.310Z',
        numberOfPeople: 6473889,
      },
    },
    two: {
      data: {
        startDate: '2023-06-28T00:24:47.310Z',
        endDate: '2023-06-28T00:24:47.310Z',
        numberOfPeople: 5688979,
      },
    },
  },
})

export type StandardScenario = ScenarioData<ShoppingList, 'shoppingList'>
