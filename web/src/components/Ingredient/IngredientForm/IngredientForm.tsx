import {
  Form,
  FormError,
  FieldError,
  Label,
  CheckboxField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditIngredientById, UpdateIngredientInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormIngredient = NonNullable<EditIngredientById['ingredient']>

interface IngredientFormProps {
  ingredient?: EditIngredientById['ingredient']
  onSave: (data: UpdateIngredientInput, id?: FormIngredient['id']) => void
  error: RWGqlError
  loading: boolean
}

const IngredientForm = (props: IngredientFormProps) => {
  const onSubmit = (data: FormIngredient) => {
    props.onSave(data, props?.ingredient?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormIngredient> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="pantryItem"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Pantry item
        </Label>

        <CheckboxField
          name="pantryItem"
          defaultChecked={props.ingredient?.pantryItem}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="pantryItem" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.ingredient?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="unit"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Unit
        </Label>

        <TextField
          name="unit"
          defaultValue={props.ingredient?.unit}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="unit" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default IngredientForm
