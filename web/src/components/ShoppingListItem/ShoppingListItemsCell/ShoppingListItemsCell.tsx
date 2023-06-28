import type { FindShoppingListItems } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ShoppingListItems from 'src/components/ShoppingListItem/ShoppingListItems'

export const QUERY = gql`
  query FindShoppingListItems {
    shoppingListItems {
      id
      shoppingListId
      ingredientId
      amount
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No shoppingListItems yet. '}
      <Link to={routes.newShoppingListItem()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  shoppingListItems,
}: CellSuccessProps<FindShoppingListItems>) => {
  return <ShoppingListItems shoppingListItems={shoppingListItems} />
}
