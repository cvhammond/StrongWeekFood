import { useState, useEffect } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ShoppingListItem/ShoppingListItemsCell'
import { truncate } from 'src/lib/formatters'

import type {
  DeleteShoppingListItemMutationVariables,
  FindShoppingListItems,
} from 'types/graphql'

const UPDATE_SHOPPING_LIST_ITEM_MUTATION = gql`
  mutation UpdateShoppingListItemMutation($id: Int!, $input: UpdateShoppingListItemInput!) {
    updateShoppingListItem(id: $id, input: $input) {
      id
    }
  }
`

const ShoppingListItemsList = ({
  shoppingListItems,
}: FindShoppingListItems) => {

  const [localShoppingListItems, setLocalShoppingListItems] = useState(shoppingListItems)

  useEffect(() => {
    setLocalShoppingListItems(shoppingListItems)
  }, [shoppingListItems])

  const [updateShoppingListItem] = useMutation(
    UPDATE_SHOPPING_LIST_ITEM_MUTATION,
    {
      onCompleted: () => {
        toast.success('ShoppingListItem updated')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onCompleteClick = (id: DeleteShoppingListItemMutationVariables['id'], complete) => {
    const input = { complete: !complete }
    //updateShoppingListItem({ variables: { id, input} })
    let newLocalShoppingListItems = localShoppingListItems.map((shoppingListItem) => {
      if (shoppingListItem.id === id) {
        return { ...shoppingListItem, complete: !complete }
      } else {
        return shoppingListItem
      }
    })
    setLocalShoppingListItems(newLocalShoppingListItems)
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Amount</th>
            <th>Pantry item</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {localShoppingListItems.map((shoppingListItem) => (
            <tr key={shoppingListItem.id}>
              <td>{truncate(shoppingListItem.ingredient?.name)}</td>
              <td>{shoppingListItem.amount} {shoppingListItem.ingredient?.unit}(s)</td>
              <td>{shoppingListItem.ingredient?.pantryItem ? 'Yes' : 'No'}</td>
              <td>
                {shoppingListItem.complete ?
                  <button
                    type="button"
                    title={'Mark Complete'}
                    className={"rw-button rw-button-small rw-button-green"}
                    onClick={() => onCompleteClick(shoppingListItem.id, shoppingListItem.complete)}
                  >
                    Complete
                  </button>
                  :
                  <button
                    type="button"
                    title={'Mark Incomplete'}
                    className={"rw-button rw-button-small rw-button-blue"}
                    onClick={() => onCompleteClick(shoppingListItem.id, shoppingListItem.complete)}
                  >
                    Got it!
                  </button>
                }

                {/*
                     <nav className="rw-table-actions">
                 <Link
                    to={routes.shoppingListItem({ id: shoppingListItem.id })}
                    title={
                      'Show shoppingListItem ' + shoppingListItem.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editShoppingListItem({
                      id: shoppingListItem.id,
                    })}
                    title={'Edit shoppingListItem ' + shoppingListItem.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete shoppingListItem ' + shoppingListItem.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(shoppingListItem.id)}
                  >
                    Delete
                  </button>
                  </nav>
                  */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ShoppingListItemsList
