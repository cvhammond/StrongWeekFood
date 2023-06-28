import type { EditIngredientById, UpdateIngredientInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IngredientForm from 'src/components/Ingredient/IngredientForm'

export const QUERY = gql`
  query EditIngredientById($id: Int!) {
    ingredient: ingredient(id: $id) {
      id
      pantryItem
      name
      unit
    }
  }
`
const UPDATE_INGREDIENT_MUTATION = gql`
  mutation UpdateIngredientMutation($id: Int!, $input: UpdateIngredientInput!) {
    updateIngredient(id: $id, input: $input) {
      id
      pantryItem
      name
      unit
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  ingredient,
}: CellSuccessProps<EditIngredientById>) => {
  const [updateIngredient, { loading, error }] = useMutation(
    UPDATE_INGREDIENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Ingredient updated')
        navigate(routes.ingredients())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateIngredientInput,
    id: EditIngredientById['ingredient']['id']
  ) => {
    updateIngredient({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Ingredient {ingredient?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <IngredientForm
          ingredient={ingredient}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
