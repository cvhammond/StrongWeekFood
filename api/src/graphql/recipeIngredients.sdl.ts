export const schema = gql`
  type RecipeIngredient {
    id: Int!
    recipe: Recipe!
    recipeId: Int!
    ingredient: Ingredient!
    ingredientId: Int!
    amount: Float!
  }

  type Query {
    recipeIngredients: [RecipeIngredient!]! @requireAuth
    recipeIngredient(id: Int!): RecipeIngredient @requireAuth
  }

  input CreateRecipeIngredientInput {
    recipeId: Int!
    ingredientId: Int!
    amount: Float!
  }

  input UpdateRecipeIngredientInput {
    recipeId: Int
    ingredientId: Int
    amount: Float
  }

  type Mutation {
    createRecipeIngredient(
      input: CreateRecipeIngredientInput!
    ): RecipeIngredient! @requireAuth
    updateRecipeIngredient(
      id: Int!
      input: UpdateRecipeIngredientInput!
    ): RecipeIngredient! @requireAuth
    deleteRecipeIngredient(id: Int!): RecipeIngredient! @requireAuth
  }
`
