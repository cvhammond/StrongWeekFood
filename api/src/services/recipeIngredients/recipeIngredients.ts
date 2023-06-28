import type {
  QueryResolvers,
  MutationResolvers,
  RecipeIngredientRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const recipeIngredients: QueryResolvers['recipeIngredients'] = () => {
  return db.recipeIngredient.findMany()
}

export const recipeIngredient: QueryResolvers['recipeIngredient'] = ({
  id,
}) => {
  return db.recipeIngredient.findUnique({
    where: { id },
  })
}

export const createRecipeIngredient: MutationResolvers['createRecipeIngredient'] =
  ({ input }) => {
    return db.recipeIngredient.create({
      data: input,
    })
  }

export const updateRecipeIngredient: MutationResolvers['updateRecipeIngredient'] =
  ({ id, input }) => {
    return db.recipeIngredient.update({
      data: input,
      where: { id },
    })
  }

export const deleteRecipeIngredient: MutationResolvers['deleteRecipeIngredient'] =
  ({ id }) => {
    return db.recipeIngredient.delete({
      where: { id },
    })
  }

export const RecipeIngredient: RecipeIngredientRelationResolvers = {
  recipe: (_obj, { root }) => {
    return db.recipeIngredient.findUnique({ where: { id: root?.id } }).recipe()
  },
  ingredient: (_obj, { root }) => {
    return db.recipeIngredient
      .findUnique({ where: { id: root?.id } })
      .ingredient()
  },
}
