import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

import type {
  DeleteShoppingListItemMutationVariables,
  FindShoppingListItemById,
} from 'types/graphql'

const DELETE_SHOPPING_LIST_ITEM_MUTATION = gql`
  mutation DeleteShoppingListItemMutation($id: Int!) {
    deleteShoppingListItem(id: $id) {
      id
    }
  }
`

interface Props {
  shoppingListItem: NonNullable<FindShoppingListItemById['shoppingListItem']>
}

const ShoppingListItem = ({ shoppingListItem }: Props) => {
  const [deleteShoppingListItem] = useMutation(
    DELETE_SHOPPING_LIST_ITEM_MUTATION,
    {
      onCompleted: () => {
        toast.success('ShoppingListItem deleted')
        navigate(routes.shoppingListItems())
      },
      onError: (error) => {
        toast.error(error.message)
      },
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
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ShoppingListItem {shoppingListItem.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{shoppingListItem.id}</td>
            </tr>
            <tr>
              <th>Shopping list id</th>
              <td>{shoppingListItem.shoppingListId}</td>
            </tr>
            <tr>
              <th>Ingredient id</th>
              <td>{shoppingListItem.ingredientId}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{shoppingListItem.amount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editShoppingListItem({ id: shoppingListItem.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(shoppingListItem.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ShoppingListItem
