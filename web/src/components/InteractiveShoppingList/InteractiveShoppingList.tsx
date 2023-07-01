import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import ShoppingListItemsList from "../ShoppingListItem/ShoppingListItems/ShoppingListItems"
import { getSundaySpread } from "src/pages/Meal/MealsPage/MealsPage"

import { CREATE_SHOPPING_LIST_MUTATION } from "src/components/ShoppingList/NewShoppingList/NewShoppingList"

const InteractiveShoppingList = ({ shoppingList }) => {

  const [createShoppingList, { loading, error }] = useMutation(
    CREATE_SHOPPING_LIST_MUTATION,
    {
      onCompleted: () => {
        toast.success('ShoppingList created')
        navigate(routes.weekShoppingList())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const remakeShoppingList = () => {
    console.log("remakeShoppingList")
    const { lastSunday, sevenDaysFromLastSunday } = getSundaySpread()
    const input = {
      startDate: lastSunday,
      endDate: sevenDaysFromLastSunday,
      numberOfPeople: 2,
    }
    createShoppingList({ variables: { input } })

  }

  return (
    <div>
      <h1>Grocery List</h1>
      <ShoppingListItemsList shoppingListItems={shoppingList.shoppingListItems} />
      <nav className="rw-button-group">
        <button
          className="rw-button rw-button-blue"
          onClick={remakeShoppingList}
        >
          Update Grocery List
        </button>
      </nav>
    </div>
  )
}

export default InteractiveShoppingList
