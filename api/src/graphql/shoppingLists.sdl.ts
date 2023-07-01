export const schema = gql`
  type ShoppingList {
    id: Int!
    startDate: DateTime!
    endDate: DateTime!
    numberOfPeople: Int!
    shoppingListItems: [ShoppingListItem]!
  }

  type Query {
    shoppingLists: [ShoppingList!]! @requireAuth
    shoppingList(id: Int!): ShoppingList @requireAuth
    shoppingListByDate(startDate: DateTime!, endDate: DateTime!, numberOfPeople: Int!): ShoppingList @requireAuth
  }

  input CreateShoppingListInput {
    startDate: DateTime!
    endDate: DateTime!
    numberOfPeople: Int!
  }

  input UpdateShoppingListInput {
    startDate: DateTime
    endDate: DateTime
    numberOfPeople: Int
  }

  type Mutation {
    createShoppingList(input: CreateShoppingListInput!): ShoppingList!
      @requireAuth
    updateShoppingList(
      id: Int!
      input: UpdateShoppingListInput!
    ): ShoppingList! @requireAuth
    deleteShoppingList(id: Int!): ShoppingList! @requireAuth
  }
`
