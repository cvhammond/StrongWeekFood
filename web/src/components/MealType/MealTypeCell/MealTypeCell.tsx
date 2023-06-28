import type { FindMealTypeById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import MealType from 'src/components/MealType/MealType'

export const QUERY = gql`
  query FindMealTypeById($id: Int!) {
    mealType: mealType(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>MealType not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ mealType }: CellSuccessProps<FindMealTypeById>) => {
  return <MealType mealType={mealType} />
}
