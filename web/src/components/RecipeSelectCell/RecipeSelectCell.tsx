
import { Label, SelectField, FieldError } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'

import { QUERY as query } from "src/components/Recipe/RecipesCell/RecipesCell"
import { Recipe } from 'types/graphql'

export const QUERY = query

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No recipes yet. '}
      <Link to={routes.newRecipe()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ recipes }) => {

  return (<>
    <Label
      name="recipeId"
      className="rw-label"
      errorClassName="rw-label rw-label-error"
    >
      Recipe
    </Label>
    <SelectField name="recipeId" defaultValue={-1}
    validation={{
      valueAsNumber: true,
      required: true,
      validate: {
        matchesInitialValue: (value) => {
          return value !== -1
        },
      },
    }}
      >
      <option value={-1} disabled>Select a recipe</option>
      {recipes.map((recipe: Recipe) => (
        <option value={recipe.id} key={recipe.id}>
          {recipe.name}
        </option>
      ))}
    </SelectField>
    <FieldError name="recipeId" className="rw-field-error" />
  </>
  )
}
