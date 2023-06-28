import type {
  EditShoppingListItemById,
  UpdateShoppingListItemInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ShoppingListItemForm from 'src/components/ShoppingListItem/ShoppingListItemForm'

export const QUERY = gql`
  query EditShoppingListItemById($id: Int!) {
    shoppingListItem: shoppingListItem(id: $id) {
      id
      shoppingListId
      ingredientId
      amount
    }
  }
`
const UPDATE_SHOPPING_LIST_ITEM_MUTATION = gql`
  mutation UpdateShoppingListItemMutation(
    $id: Int!
    $input: UpdateShoppingListItemInput!
  ) {
    updateShoppingListItem(id: $id, input: $input) {
      id
      shoppingListId
      ingredientId
      amount
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  shoppingListItem,
}: CellSuccessProps<EditShoppingListItemById>) => {
  const [updateShoppingListItem, { loading, error }] = useMutation(
    UPDATE_SHOPPING_LIST_ITEM_MUTATION,
    {
      onCompleted: () => {
        toast.success('ShoppingListItem updated')
        navigate(routes.shoppingListItems())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateShoppingListItemInput,
    id: EditShoppingListItemById['shoppingListItem']['id']
  ) => {
    updateShoppingListItem({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ShoppingListItem {shoppingListItem?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ShoppingListItemForm
          shoppingListItem={shoppingListItem}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
