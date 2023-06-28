import type { EditMealTypeById, UpdateMealTypeInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MealTypeForm from 'src/components/MealType/MealTypeForm'

export const QUERY = gql`
  query EditMealTypeById($id: Int!) {
    mealType: mealType(id: $id) {
      id
      name
    }
  }
`
const UPDATE_MEAL_TYPE_MUTATION = gql`
  mutation UpdateMealTypeMutation($id: Int!, $input: UpdateMealTypeInput!) {
    updateMealType(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ mealType }: CellSuccessProps<EditMealTypeById>) => {
  const [updateMealType, { loading, error }] = useMutation(
    UPDATE_MEAL_TYPE_MUTATION,
    {
      onCompleted: () => {
        toast.success('MealType updated')
        navigate(routes.mealTypes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateMealTypeInput,
    id: EditMealTypeById['mealType']['id']
  ) => {
    updateMealType({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit MealType {mealType?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <MealTypeForm
          mealType={mealType}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
