import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  DatetimeLocalField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditMealById, UpdateMealInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormMeal = NonNullable<EditMealById['meal']>

interface MealFormProps {
  meal?: EditMealById['meal']
  onSave: (data: UpdateMealInput, id?: FormMeal['id']) => void
  error: RWGqlError
  loading: boolean
}

const MealForm = (props: MealFormProps) => {
  const onSubmit = (data: FormMeal) => {
    props.onSave(data, props?.meal?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormMeal> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="mealTypeId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Meal type id
        </Label>

        <NumberField
          name="mealTypeId"
          defaultValue={props.meal?.mealTypeId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="mealTypeId" className="rw-field-error" />

        <Label
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>

        <DatetimeLocalField
          name="date"
          defaultValue={formatDatetime(props.meal?.date)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="date" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.meal?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="recipeId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Recipe id
        </Label>

        <NumberField
          name="recipeId"
          defaultValue={props.meal?.recipeId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="recipeId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default MealForm
