import type { FindIngredientById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Ingredient from 'src/components/Ingredient/Ingredient'

export const QUERY = gql`
  query FindIngredientById($id: Int!) {
    ingredient: ingredient(id: $id) {
      id
      pantryItem
      name
      unit
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Ingredient not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  ingredient,
}: CellSuccessProps<FindIngredientById>) => {
  return <Ingredient ingredient={ingredient} />
}
