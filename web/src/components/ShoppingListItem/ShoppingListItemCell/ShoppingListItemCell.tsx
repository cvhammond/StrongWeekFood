import type { FindShoppingListItemById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ShoppingListItem from 'src/components/ShoppingListItem/ShoppingListItem'

export const QUERY = gql`
  query FindShoppingListItemById($id: Int!) {
    shoppingListItem: shoppingListItem(id: $id) {
      id
      shoppingListId
      ingredientId
      amount
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ShoppingListItem not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  shoppingListItem,
}: CellSuccessProps<FindShoppingListItemById>) => {
  return <ShoppingListItem shoppingListItem={shoppingListItem} />
}
