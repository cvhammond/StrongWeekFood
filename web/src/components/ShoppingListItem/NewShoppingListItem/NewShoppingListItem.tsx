import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ShoppingListItemForm from 'src/components/ShoppingListItem/ShoppingListItemForm'

import type { CreateShoppingListItemInput } from 'types/graphql'

const CREATE_SHOPPING_LIST_ITEM_MUTATION = gql`
  mutation CreateShoppingListItemMutation(
    $input: CreateShoppingListItemInput!
  ) {
    createShoppingListItem(input: $input) {
      id
    }
  }
`

const NewShoppingListItem = () => {
  const [createShoppingListItem, { loading, error }] = useMutation(
    CREATE_SHOPPING_LIST_ITEM_MUTATION,
    {
      onCompleted: () => {
        toast.success('ShoppingListItem created')
        navigate(routes.shoppingListItems())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateShoppingListItemInput) => {
    createShoppingListItem({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New ShoppingListItem
        </h2>
      </header>
      <div className="rw-segment-main">
        <ShoppingListItemForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewShoppingListItem
