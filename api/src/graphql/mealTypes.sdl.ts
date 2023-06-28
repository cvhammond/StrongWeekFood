export const schema = gql`
  type MealType {
    id: Int!
    name: String!
    meals: [Meal]!
  }

  type Query {
    mealTypes: [MealType!]! @requireAuth
    mealType(id: Int!): MealType @requireAuth
  }

  input CreateMealTypeInput {
    name: String!
  }

  input UpdateMealTypeInput {
    name: String
  }

  type Mutation {
    createMealType(input: CreateMealTypeInput!): MealType! @requireAuth
    updateMealType(id: Int!, input: UpdateMealTypeInput!): MealType!
      @requireAuth
    deleteMealType(id: Int!): MealType! @requireAuth
  }
`
