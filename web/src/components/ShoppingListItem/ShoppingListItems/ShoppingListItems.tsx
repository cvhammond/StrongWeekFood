import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ShoppingListItem/ShoppingListItemsCell'
import { truncate } from 'src/lib/formatters'

import type {
  DeleteShoppingListItemMutationVariables,
  FindShoppingListItems,
} from 'types/graphql'

const DELETE_SHOPPING_LIST_ITEM_MUTATION = gql`
  mutation DeleteShoppingListItemMutation($id: Int!) {
    deleteShoppingListItem(id: $id) {
      id
    }
  }
`

const ShoppingListItemsList = ({
  shoppingListItems,
}: FindShoppingListItems) => {
  const [deleteShoppingListItem] = useMutation(
    DELETE_SHOPPING_LIST_ITEM_MUTATION,
    {
      onCompleted: () => {
        toast.success('ShoppingListItem deleted')
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

  const onDeleteClick = (id: DeleteShoppingListItemMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to delete shoppingListItem ' + id + '?')
    ) {
      deleteShoppingListItem({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Shopping list id</th>
            <th>Ingredient id</th>
            <th>Amount</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {shoppingListItems.map((shoppingListItem) => (
            <tr key={shoppingListItem.id}>
              <td>{truncate(shoppingListItem.id)}</td>
              <td>{truncate(shoppingListItem.shoppingListId)}</td>
              <td>{truncate(shoppingListItem.ingredientId)}</td>
              <td>{truncate(shoppingListItem.amount)}</td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ShoppingListItemsList
