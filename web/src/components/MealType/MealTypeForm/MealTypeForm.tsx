import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditMealTypeById, UpdateMealTypeInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormMealType = NonNullable<EditMealTypeById['mealType']>

interface MealTypeFormProps {
  mealType?: EditMealTypeById['mealType']
  onSave: (data: UpdateMealTypeInput, id?: FormMealType['id']) => void
  error: RWGqlError
  loading: boolean
}

const MealTypeForm = (props: MealTypeFormProps) => {
  const onSubmit = (data: FormMealType) => {
    props.onSave(data, props?.mealType?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormMealType> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.mealType?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default MealTypeForm
