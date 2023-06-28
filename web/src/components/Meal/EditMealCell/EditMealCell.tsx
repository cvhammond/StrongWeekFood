import type { EditMealById, UpdateMealInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MealForm from 'src/components/Meal/MealForm'

export const QUERY = gql`
  query EditMealById($id: Int!) {
    meal: meal(id: $id) {
      id
      mealTypeId
      date
      description
      recipeId
    }
  }
`
const UPDATE_MEAL_MUTATION = gql`
  mutation UpdateMealMutation($id: Int!, $input: UpdateMealInput!) {
    updateMeal(id: $id, input: $input) {
      id
      mealTypeId
      date
      description
      recipeId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ meal }: CellSuccessProps<EditMealById>) => {
  const [updateMeal, { loading, error }] = useMutation(UPDATE_MEAL_MUTATION, {
    onCompleted: () => {
      toast.success('Meal updated')
      navigate(routes.meals())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateMealInput, id: EditMealById['meal']['id']) => {
    updateMeal({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Meal {meal?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <MealForm meal={meal} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
