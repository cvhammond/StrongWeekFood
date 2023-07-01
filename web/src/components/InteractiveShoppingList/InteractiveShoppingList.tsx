import ShoppingListItemsList from "../ShoppingListItem/ShoppingListItems/ShoppingListItems"

const InteractiveShoppingList = ({ shoppingList }) => {
  return (
    <div>
      <h2>{'InteractiveShoppingList'}</h2>
      <ShoppingListItemsList shoppingListItems={shoppingList.shoppingListItems} />
    </div>
  )
}

export default InteractiveShoppingList
