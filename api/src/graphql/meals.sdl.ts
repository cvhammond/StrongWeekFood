export const schema = gql`
  type Meal {
    id: Int!
    mealType: MealType!
    mealTypeId: Int!
    date: DateTime!
    description: String!
    recipe: Recipe!
    recipeId: Int!
  }

  type Query {
    meals: [Meal!]! @requireAuth
    meal(id: Int!): Meal @requireAuth
    mealsByDate(date: DateTime!): [Meal!]! @requireAuth
  }

  input CreateMealInput {
    mealTypeId: Int!
    date: DateTime!
    description: String!
    recipeId: Int!
  }

  input UpdateMealInput {
    mealTypeId: Int
    date: DateTime
    description: String
    recipeId: Int
  }

  type Mutation {
    createMeal(input: CreateMealInput!): Meal! @requireAuth
    updateMeal(id: Int!, input: UpdateMealInput!): Meal! @requireAuth
    deleteMeal(id: Int!): Meal! @requireAuth
  }
`
