import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { } from 'src/lib/formatters'

import type {
  DeleteRecipeMutationVariables,
  FindRecipeById,
} from 'types/graphql'

import RecipeIngredientsCell from 'src/components/RecipeIngredient/RecipeIngredientsCell'

const DELETE_RECIPE_MUTATION = gql`
  mutation DeleteRecipeMutation($id: Int!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`

interface Props {
  recipe: NonNullable<FindRecipeById['recipe']>
}

const Recipe = ({ recipe }: Props) => {
  const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION, {
    onCompleted: () => {
      toast.success('Recipe deleted')
      navigate(routes.recipes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteRecipeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete recipe ' + id + '?')) {
      deleteRecipe({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Recipe {recipe.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{recipe.name}</td>
            </tr>
            <tr>
              <th>Prep time</th>
              <td>{recipe.prep_time}</td>
            </tr>
            <tr>
              <th>Cook time</th>
              <td>{recipe.cook_time}</td>
            </tr>
            <tr>
              <th>Servings</th>
              <td>{recipe.servings}</td>
            </tr>
            <tr>
              <th>Intro</th>
              <td>{recipe.intro}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{recipe.description}</td>
            </tr>
            <tr>
              <th>Rating</th>
              <td>{recipe.rating}</td>
            </tr>
            <tr>
              <th>Tags</th>
              <td>{recipe.tags}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link to={routes.newRecipeIngredient({ recipeId: recipe.id })} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Ingredient
        </Link>
        <Link
          to={routes.editRecipe({ id: recipe.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(recipe.id)}
        >
          Delete
        </button>
      </nav>
      <RecipeIngredientsCell recipeId={recipe.id} />
    </>
  )
}

export default Recipe
