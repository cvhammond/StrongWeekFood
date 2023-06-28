import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/MealType/MealTypesCell'
import { truncate } from 'src/lib/formatters'

import type {
  DeleteMealTypeMutationVariables,
  FindMealTypes,
} from 'types/graphql'

const DELETE_MEAL_TYPE_MUTATION = gql`
  mutation DeleteMealTypeMutation($id: Int!) {
    deleteMealType(id: $id) {
      id
    }
  }
`

const MealTypesList = ({ mealTypes }: FindMealTypes) => {
  const [deleteMealType] = useMutation(DELETE_MEAL_TYPE_MUTATION, {
    onCompleted: () => {
      toast.success('MealType deleted')
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

  const onDeleteClick = (id: DeleteMealTypeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete mealType ' + id + '?')) {
      deleteMealType({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {mealTypes.map((mealType) => (
            <tr key={mealType.id}>
              <td>{truncate(mealType.id)}</td>
              <td>{truncate(mealType.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.mealType({ id: mealType.id })}
                    title={'Show mealType ' + mealType.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editMealType({ id: mealType.id })}
                    title={'Edit mealType ' + mealType.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete mealType ' + mealType.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(mealType.id)}
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

export default MealTypesList
