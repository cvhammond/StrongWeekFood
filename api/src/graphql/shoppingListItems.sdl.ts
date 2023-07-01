export const schema = gql`
  type ShoppingListItem {
    id: Int!
    shoppingList: ShoppingList!
    shoppingListId: Int!
    ingredient: Ingredient!
    ingredientId: Int!
    amount: Float!
    complete: Boolean
  }

  type Query {
    shoppingListItems: [ShoppingListItem!]! @requireAuth
    shoppingListItem(id: Int!): ShoppingListItem @requireAuth
  }

  input CreateShoppingListItemInput {
    shoppingListId: Int!
    ingredientId: Int!
    amount: Float!
  }

  input UpdateShoppingListItemInput {
    shoppingListId: Int
    ingredientId: Int
    amount: Float
    complete: Boolean
  }

  type Mutation {
    createShoppingListItem(
      input: CreateShoppingListItemInput!
    ): ShoppingListItem! @requireAuth
    updateShoppingListItem(
      id: Int!
      input: UpdateShoppingListItemInput!
    ): ShoppingListItem! @requireAuth
    deleteShoppingListItem(id: Int!): ShoppingListItem! @requireAuth
  }
`
