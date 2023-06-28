import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

import type {
  DeleteRecipeIngredientMutationVariables,
  FindRecipeIngredientById,
} from 'types/graphql'

const DELETE_RECIPE_INGREDIENT_MUTATION = gql`
  mutation DeleteRecipeIngredientMutation($id: Int!) {
    deleteRecipeIngredient(id: $id) {
      id
    }
  }
`

interface Props {
  recipeIngredient: NonNullable<FindRecipeIngredientById['recipeIngredient']>
}

const RecipeIngredient = ({ recipeIngredient }: Props) => {
  const [deleteRecipeIngredient] = useMutation(
    DELETE_RECIPE_INGREDIENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('RecipeIngredient deleted')
        navigate(routes.recipeIngredients())
      },
      onError: (error) => {
        toast.error(error.message)
      },
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
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            RecipeIngredient {recipeIngredient.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{recipeIngredient.id}</td>
            </tr>
            <tr>
              <th>Recipe id</th>
              <td>{recipeIngredient.recipeId}</td>
            </tr>
            <tr>
              <th>Ingredient id</th>
              <td>{recipeIngredient.ingredientId}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{recipeIngredient.amount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editRecipeIngredient({ id: recipeIngredient.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(recipeIngredient.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default RecipeIngredient
