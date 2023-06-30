import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Meal/MealsCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeleteMealMutationVariables, FindMeals } from 'types/graphql'

const DELETE_MEAL_MUTATION = gql`
  mutation DeleteMealMutation($id: Int!) {
    deleteMeal(id: $id) {
      id
    }
  }
`

const MealsList = ({ meals }: FindMeals) => {
  const [deleteMeal] = useMutation(DELETE_MEAL_MUTATION, {
    onCompleted: () => {
      toast.success('Meal deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteMealMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete meal ' + id + '?')) {
      deleteMeal({ variables: { id } })
    }
  }

  console.log(meals)

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Meal Type</th>
            <th>Description</th>
            <th>Recipe</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {meals && meals.map((meal) => (
            <tr key={meal.id}>
              <td>{truncate(meal.mealType?.name)}</td>
              <td>{truncate(meal.description)}</td>
              <td>{truncate(meal.recipe?.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.recipe({ id: meal.recipe?.id })}
                    title={'Show meal ' + meal.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editMeal({ id: meal.id })}
                    title={'Edit meal ' + meal.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete meal ' + meal.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(meal.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MealsList
