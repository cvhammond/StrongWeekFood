import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/RecipeIngredient/RecipeIngredientsCell'
import { truncate } from 'src/lib/formatters'

import type {
  DeleteRecipeIngredientMutationVariables,
  FindRecipeIngredients,
} from 'types/graphql'

const DELETE_RECIPE_INGREDIENT_MUTATION = gql`
  mutation DeleteRecipeIngredientMutation($id: Int!) {
    deleteRecipeIngredient(id: $id) {
      id
    }
  }
`

const RecipeIngredientsList = ({
  recipeIngredients,
}: FindRecipeIngredients) => {
  const [deleteRecipeIngredient] = useMutation(
    DELETE_RECIPE_INGREDIENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('RecipeIngredient deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (id: DeleteRecipeIngredientMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to delete recipeIngredient ' + id + '?')
    ) {
      deleteRecipeIngredient({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Recipe id</th>
            <th>Ingredient id</th>
            <th>Amount</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {recipeIngredients.map((recipeIngredient) => (
            <tr key={recipeIngredient.id}>
              <td>{truncate(recipeIngredient.id)}</td>
              <td>{truncate(recipeIngredient.recipeId)}</td>
              <td>{truncate(recipeIngredient.ingredientId)}</td>
              <td>{truncate(recipeIngredient.amount)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.recipeIngredient({ id: recipeIngredient.id })}
                    title={
                      'Show recipeIngredient ' + recipeIngredient.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editRecipeIngredient({
                      id: recipeIngredient.id,
                    })}
                    title={'Edit recipeIngredient ' + recipeIngredient.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete recipeIngredient ' + recipeIngredient.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(recipeIngredient.id)}
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

export default RecipeIngredientsList
