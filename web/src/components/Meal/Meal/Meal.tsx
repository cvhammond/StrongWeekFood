import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

import type { DeleteMealMutationVariables, FindMealById } from 'types/graphql'

const DELETE_MEAL_MUTATION = gql`
  mutation DeleteMealMutation($id: Int!) {
    deleteMeal(id: $id) {
      id
    }
  }
`

interface Props {
  meal: NonNullable<FindMealById['meal']>
}

const Meal = ({ meal }: Props) => {
  const [deleteMeal] = useMutation(DELETE_MEAL_MUTATION, {
    onCompleted: () => {
      toast.success('Meal deleted')
      navigate(routes.meals())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteMealMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete meal ' + id + '?')) {
      deleteMeal({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Meal {meal.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{meal.id}</td>
            </tr>
            <tr>
              <th>Meal type id</th>
              <td>{meal.mealTypeId}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(meal.date)}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{meal.description}</td>
            </tr>
            <tr>
              <th>Recipe id</th>
              <td>{meal.recipeId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMeal({ id: meal.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(meal.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Meal
