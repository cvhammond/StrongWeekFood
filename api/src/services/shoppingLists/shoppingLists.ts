import type {
  QueryResolvers,
  MutationResolvers,
  ShoppingListRelationResolvers,
} from 'types/graphql'
import { dateRange } from '../meals/meals'
import { createShoppingListItem } from '../shoppingListItems/shoppingListItems'

import { db } from 'src/lib/db'

export const shoppingLists: QueryResolvers['shoppingLists'] = () => {
  return db.shoppingList.findMany()
}

export const shoppingList: QueryResolvers['shoppingList'] = ({ id }) => {
  return db.shoppingList.findUnique({
    where: { id },
  })
}

export const shoppingListByDate =
 async  ({ startDate, endDate, numberOfPeople }) => {
    let startAsDate = new Date(startDate)
    let endAsDate = new Date(endDate)
    const { start: startBegin, end: startEnd } = dateRange(startAsDate)
    const { start: endBegin, end: endEnd } = dateRange(endAsDate)
    let shoppingList = await db.shoppingList.findMany({
      orderBy: { id: 'desc' },
      where: {
        startDate:
          { gte: startBegin, lte: startEnd },
        endDate:
          { gte: endBegin, lte: endEnd }
      },
    })
    if (shoppingList.length === 0) {
      return createShoppingList({input: { startDate, endDate, numberOfPeople }})
    }
    return shoppingList[0]

  }

export const createShoppingList = async ({
  input,
}) => {
  let shoppingList = await db.shoppingList.create({
    data: input,
  })
  let startAsDate = new Date(input.startDate)
  let endAsDate = new Date(input.endDate)
  let meals = await db.meal.findMany({
    where: {
      date: {
        gte: startAsDate,
        lte: endAsDate,
      },
    },
  })
  for (let meal of meals) {
    let recipe = await db.recipe.findUnique({
      where: { id: meal.recipeId },
    })
    let recipeIngredients = await db.recipeIngredient.findMany({
      where: { recipeId: recipe.id },
    })
    for (let recipeIngredient of recipeIngredients) {
      let shoppingListItem = await createShoppingListItem({input: {
        shoppingListId: shoppingList.id,
        ingredientId: recipeIngredient.ingredientId,
        amount: recipeIngredient.amount * input.numberOfPeople }})
      db.shoppingList.update({
        where: { id: shoppingList.id },
        data: { shoppingListItems: { connect: { id: shoppingListItem.id } } },
      })
    }
  }


  return db.shoppingList.findUnique({
    where: { id: shoppingList.id },
  })
}

export const updateShoppingList: MutationResolvers['updateShoppingList'] = ({
  id,
  input,
}) => {
  return db.shoppingList.update({
    data: input,
    where: { id },
  })
}

export const deleteShoppingList: MutationResolvers['deleteShoppingList'] = ({
  id,
}) => {
  return db.shoppingList.delete({
    where: { id },
  })
}

export const ShoppingList: ShoppingListRelationResolvers = {
  shoppingListItems: (_obj, { root }) => {
    return db.shoppingList
      .findUnique({ where: { id: root?.id } })
      .shoppingListItems()
  },
}
