import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

import type {
  DeleteMealTypeMutationVariables,
  FindMealTypeById,
} from 'types/graphql'

const DELETE_MEAL_TYPE_MUTATION = gql`
  mutation DeleteMealTypeMutation($id: Int!) {
    deleteMealType(id: $id) {
      id
    }
  }
`

interface Props {
  mealType: NonNullable<FindMealTypeById['mealType']>
}

const MealType = ({ mealType }: Props) => {
  const [deleteMealType] = useMutation(DELETE_MEAL_TYPE_MUTATION, {
    onCompleted: () => {
      toast.success('MealType deleted')
      navigate(routes.mealTypes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteMealTypeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete mealType ' + id + '?')) {
      deleteMealType({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            MealType {mealType.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{mealType.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{mealType.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMealType({ id: mealType.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(mealType.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default MealType
