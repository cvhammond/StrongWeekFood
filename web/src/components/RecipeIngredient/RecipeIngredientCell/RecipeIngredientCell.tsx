import type { FindRecipeIngredientById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import RecipeIngredient from 'src/components/RecipeIngredient/RecipeIngredient'

export const QUERY = gql`
  query FindRecipeIngredientById($id: Int!) {
    recipeIngredient: recipeIngredient(id: $id) {
      id
      recipeId
      ingredientId
      amount
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>RecipeIngredient not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  recipeIngredient,
}: CellSuccessProps<FindRecipeIngredientById>) => {
  return <RecipeIngredient recipeIngredient={recipeIngredient} />
}
