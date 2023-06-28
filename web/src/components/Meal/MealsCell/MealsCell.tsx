import type { FindMeals } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Meals from 'src/components/Meal/Meals'

export const QUERY = gql`
  query($date: DateTime!) {
    mealsByDate(date: $date) {
      id
      mealTypeId
      date
      description
      recipeId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No meals yet. '}
      <Link to={routes.newMeal()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ meals }: CellSuccessProps<FindMeals>) => {
  return <Meals meals={meals} />
}
