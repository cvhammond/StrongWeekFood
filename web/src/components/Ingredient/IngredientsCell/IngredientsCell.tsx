import type { FindIngredients } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Ingredients from 'src/components/Ingredient/Ingredients'

export const QUERY = gql`
  query FindIngredients {
    ingredients {
      id
      pantryItem
      name
      unit
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No ingredients yet. '}
      <Link to={routes.newIngredient()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ingredients }: CellSuccessProps<FindIngredients>) => {
  return <Ingredients ingredients={ingredients} />
}
