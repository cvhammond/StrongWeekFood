import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RecipeIngredientForm from 'src/components/RecipeIngredient/RecipeIngredientForm'

import type { CreateRecipeIngredientInput } from 'types/graphql'

const CREATE_RECIPE_INGREDIENT_MUTATION = gql`
  mutation CreateRecipeIngredientMutation(
    $input: CreateRecipeIngredientInput!
  ) {
    createRecipeIngredient(input: $input) {
      id
    }
  }
`

const NewRecipeIngredient = () => {
  const [recipeId, setRecipeId] = React.useState<number>()

  const [createRecipeIngredient, { loading, error }] = useMutation(
    CREATE_RECIPE_INGREDIENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('RecipeIngredient created')
        navigate(
          recipeId ? routes.recipe({ id: recipeId }) : routes.recipeIngredients())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateRecipeIngredientInput) => {
    setRecipeId(input.recipeId)
    createRecipeIngredient({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New RecipeIngredient
        </h2>
      </header>
      <div className="rw-segment-main">
        <RecipeIngredientForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRecipeIngredient
