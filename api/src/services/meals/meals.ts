import type {
  QueryResolvers,
  MutationResolvers,
  MealRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const meals: QueryResolvers['meals'] = () => {
  return db.meal.findMany()
}

export const meal: QueryResolvers['meal'] = ({ id }) => {
  return db.meal.findUnique({
    where: { id },
  })
}

export const dateRange = (date: Date) => {
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  const end = new Date(date)
  end.setHours(23, 59, 59, 999)
  return { start, end }
}

export const mealsByDate: QueryResolvers['mealsByDate'] = ({ date }) => {
  let asDate = new Date(date)
  const { start, end } = dateRange(asDate)
  return db.meal.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
  })
}

export const createMeal: MutationResolvers['createMeal'] = ({ input }) => {
  return db.meal.create({
    data: input,
  })
}

export const updateMeal: MutationResolvers['updateMeal'] = ({ id, input }) => {
  return db.meal.update({
    data: input,
    where: { id },
  })
}

export const deleteMeal: MutationResolvers['deleteMeal'] = ({ id }) => {
  return db.meal.delete({
    where: { id },
  })
}

export const Meal: MealRelationResolvers = {
  mealType: (_obj, { root }) => {
    return db.meal.findUnique({ where: { id: root?.id } }).mealType()
  },
  recipe: (_obj, { root }) => {
    return db.meal.findUnique({ where: { id: root?.id } }).recipe()
  },
}
