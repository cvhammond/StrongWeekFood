import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Ingredient/IngredientsCell'
import { checkboxInputTag, truncate } from 'src/lib/formatters'

import type {
  DeleteIngredientMutationVariables,
  FindIngredients,
} from 'types/graphql'

const DELETE_INGREDIENT_MUTATION = gql`
  mutation DeleteIngredientMutation($id: Int!) {
    deleteIngredient(id: $id) {
      id
    }
  }
`

const IngredientsList = ({ ingredients }: FindIngredients) => {
  const [deleteIngredient] = useMutation(DELETE_INGREDIENT_MUTATION, {
    onCompleted: () => {
      toast.success('Ingredient deleted')
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

  const onDeleteClick = (id: DeleteIngredientMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete ingredient ' + id + '?')) {
      deleteIngredient({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Pantry item</th>
            <th>Name</th>
            <th>Unit</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <td>{truncate(ingredient.id)}</td>
              <td>{checkboxInputTag(ingredient.pantryItem)}</td>
              <td>{truncate(ingredient.name)}</td>
              <td>{truncate(ingredient.unit)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.ingredient({ id: ingredient.id })}
                    title={'Show ingredient ' + ingredient.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editIngredient({ id: ingredient.id })}
                    title={'Edit ingredient ' + ingredient.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete ingredient ' + ingredient.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(ingredient.id)}
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

export default IngredientsList
