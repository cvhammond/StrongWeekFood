import type {
  QueryResolvers,
  MutationResolvers,
  MealTypeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const mealTypes: QueryResolvers['mealTypes'] = () => {
  return db.mealType.findMany()
}

export const mealType: QueryResolvers['mealType'] = ({ id }) => {
  return db.mealType.findUnique({
    where: { id },
  })
}

export const createMealType: MutationResolvers['createMealType'] = ({
  input,
}) => {
  return db.mealType.create({
    data: input,
  })
}

export const updateMealType: MutationResolvers['updateMealType'] = ({
  id,
  input,
}) => {
  return db.mealType.update({
    data: input,
    where: { id },
  })
}

export const deleteMealType: MutationResolvers['deleteMealType'] = ({ id }) => {
  return db.mealType.delete({
    where: { id },
  })
}

export const MealType: MealTypeRelationResolvers = {
  meals: (_obj, { root }) => {
    return db.mealType.findUnique({ where: { id: root?.id } }).meals()
  },
}
