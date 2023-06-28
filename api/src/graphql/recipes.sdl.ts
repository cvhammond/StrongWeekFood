export const schema = gql`
  type Recipe {
    id: Int!
    name: String!
    prep_time: Int!
    cook_time: Int!
    servings: Int!
    intro: String!
    description: String!
    rating: Int!
    tags: String!
    recipeIngredients: [RecipeIngredient]!
    meals: [Meal]!
  }

  type Query {
    recipes: [Recipe!]! @requireAuth
    recipe(id: Int!): Recipe @requireAuth
  }

  input CreateRecipeInput {
    name: String!
    prep_time: Int!
    cook_time: Int!
    servings: Int!
    intro: String!
    description: String!
    rating: Int!
    tags: String!
  }

  input UpdateRecipeInput {
    name: String
    prep_time: Int
    cook_time: Int
    servings: Int
    intro: String
    description: String
    rating: Int
    tags: String
  }

  type Mutation {
    createRecipe(input: CreateRecipeInput!): Recipe! @requireAuth
    updateRecipe(id: Int!, input: UpdateRecipeInput!): Recipe! @requireAuth
    deleteRecipe(id: Int!): Recipe! @requireAuth
  }
`
