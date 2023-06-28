import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MealTypeForm from 'src/components/MealType/MealTypeForm'

import type { CreateMealTypeInput } from 'types/graphql'

const CREATE_MEAL_TYPE_MUTATION = gql`
  mutation CreateMealTypeMutation($input: CreateMealTypeInput!) {
    createMealType(input: $input) {
      id
    }
  }
`

const NewMealType = () => {
  const [createMealType, { loading, error }] = useMutation(
    CREATE_MEAL_TYPE_MUTATION,
    {
      onCompleted: () => {
        toast.success('MealType created')
        navigate(routes.mealTypes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateMealTypeInput) => {
    createMealType({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New MealType</h2>
      </header>
      <div className="rw-segment-main">
        <MealTypeForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewMealType
