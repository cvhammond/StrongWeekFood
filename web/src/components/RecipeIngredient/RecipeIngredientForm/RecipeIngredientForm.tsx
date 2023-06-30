import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditRecipeIngredientById,
  UpdateRecipeIngredientInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import RecipeSelectCell from 'src/components/RecipeSelectCell'
import IngredientSelectCell from 'src/components/IngredientSelectCell'

type FormRecipeIngredient = NonNullable<
  EditRecipeIngredientById['recipeIngredient']
>

interface RecipeIngredientFormProps {
  recipeIngredient?: EditRecipeIngredientById['recipeIngredient']
  onSave: (
    data: UpdateRecipeIngredientInput,
    id?: FormRecipeIngredient['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const RecipeIngredientForm = (props: RecipeIngredientFormProps) => {

  const [ingredientUnits, setIngredientUnits] = React.useState<string>()

  let units = ingredientUnits ?? ''
  if (units) {
    units = ` in ${units}`
    if (!(units[units.length - 1] === 's')) {
      units += '(s)'
    }
  }

  const onSubmit = (data: FormRecipeIngredient) => {
    props.onSave(data, props?.recipeIngredient?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormRecipeIngredient> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <RecipeSelectCell />

        {/*
        <Label
          name="ingredientId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ingredient id
        </Label>

        <NumberField
          name="ingredientId"
          defaultValue={props.recipeIngredient?.ingredientId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="ingredientId" className="rw-field-error" />
        */}

        <IngredientSelectCell setIngredientUnits={setIngredientUnits} />

        <Label
          name="amount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Amount {units}
        </Label>

        <NumberField
          name="amount"
          defaultValue={props.recipeIngredient?.amount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="amount" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default RecipeIngredientForm
