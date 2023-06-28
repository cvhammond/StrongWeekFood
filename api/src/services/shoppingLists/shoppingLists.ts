import type {
  QueryResolvers,
  MutationResolvers,
  ShoppingListRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const shoppingLists: QueryResolvers['shoppingLists'] = () => {
  return db.shoppingList.findMany()
}

export const shoppingList: QueryResolvers['shoppingList'] = ({ id }) => {
  return db.shoppingList.findUnique({
    where: { id },
  })
}

export const createShoppingList: MutationResolvers['createShoppingList'] = ({
  input,
}) => {
  return db.shoppingList.create({
    data: input,
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
