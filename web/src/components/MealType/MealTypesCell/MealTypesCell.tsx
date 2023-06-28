import type { FindMealTypes } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import MealTypes from 'src/components/MealType/MealTypes'

export const QUERY = gql`
  query FindMealTypes {
    mealTypes {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No mealTypes yet. '}
      <Link to={routes.newMealType()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ mealTypes }: CellSuccessProps<FindMealTypes>) => {
  return <MealTypes mealTypes={mealTypes} />
}
