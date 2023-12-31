import type { FindMealById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Meal from 'src/components/Meal/Meal'

export const QUERY = gql`
  query FindMealById($id: Int!) {
    meal: meal(id: $id) {
      id
      mealTypeId
      date
      description
      recipeId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Meal not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ meal }: CellSuccessProps<FindMealById>) => {
  return <Meal meal={meal} />
}
