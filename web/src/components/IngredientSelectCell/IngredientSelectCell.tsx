
import { Label, SelectField, FieldError } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'

import { QUERY as query } from "src/components/Ingredient/IngredientsCell/IngredientsCell"
import { Ingredient } from 'types/graphql'

export const QUERY = query

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No ingredients yet. '}
      <Link to={routes.newIngredient()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ ingredients, setIngredientUnits }) => {

  const onChange = (e: any) => {
    const ingredientId = e.target.value
    const ingredient = ingredients.find(ingredient => ingredient.id === parseInt(ingredientId))
    setIngredientUnits(ingredient.unit)
  }

  return (<>
    <Label
      name="ingredientId"
      className="rw-label"
      errorClassName="rw-label rw-label-error"
    >
      Ingredient
    </Label>
    <SelectField name="ingredientId" defaultValue={-1} onChange={onChange}
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
      <option value={-1} disabled>Select an ingredient</option>
      {ingredients.map((ingredient: Ingredient) => (
        <option value={ingredient.id} key={ingredient.id}>
          {ingredient.name}
        </option>
      ))}
    </SelectField>
    <FieldError name="ingredientId" className="rw-field-error" />
  </>
  )
}
