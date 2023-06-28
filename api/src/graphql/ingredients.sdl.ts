export const schema = gql`
  type Ingredient {
    id: Int!
    recipeIngredients: [RecipeIngredient]!
    pantryItem: Boolean!
    name: String!
    unit: String!
    shoppingListItems: [ShoppingListItem]!
  }

  type Query {
    ingredients: [Ingredient!]! @requireAuth
    ingredient(id: Int!): Ingredient @requireAuth
  }

  input CreateIngredientInput {
    pantryItem: Boolean!
    name: String!
    unit: String!
  }

  input UpdateIngredientInput {
    pantryItem: Boolean
    name: String
    unit: String
  }

  type Mutation {
    createIngredient(input: CreateIngredientInput!): Ingredient! @requireAuth
    updateIngredient(id: Int!, input: UpdateIngredientInput!): Ingredient!
      @requireAuth
    deleteIngredient(id: Int!): Ingredient! @requireAuth
  }
`
