import type {
  EditRecipeIngredientById,
  UpdateRecipeIngredientInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RecipeIngredientForm from 'src/components/RecipeIngredient/RecipeIngredientForm'

export const QUERY = gql`
  query EditRecipeIngredientById($id: Int!) {
    recipeIngredient: recipeIngredient(id: $id) {
      id
      recipeId
      ingredientId
      amount
    }
  }
`
const UPDATE_RECIPE_INGREDIENT_MUTATION = gql`
  mutation UpdateRecipeIngredientMutation(
    $id: Int!
    $input: UpdateRecipeIngredientInput!
  ) {
    updateRecipeIngredient(id: $id, input: $input) {
      id
      recipeId
      ingredientId
      amount
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  recipeIngredient,
}: CellSuccessProps<EditRecipeIngredientById>) => {
  const [updateRecipeIngredient, { loading, error }] = useMutation(
    UPDATE_RECIPE_INGREDIENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('RecipeIngredient updated')
        navigate(routes.recipeIngredients())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateRecipeIngredientInput,
    id: EditRecipeIngredientById['recipeIngredient']['id']
  ) => {
    updateRecipeIngredient({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit RecipeIngredient {recipeIngredient?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <RecipeIngredientForm
          recipeIngredient={recipeIngredient}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
