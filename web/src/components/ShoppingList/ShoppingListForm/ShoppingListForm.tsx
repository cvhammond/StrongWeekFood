import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditShoppingListById,
  UpdateShoppingListInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormShoppingList = NonNullable<EditShoppingListById['shoppingList']>

interface ShoppingListFormProps {
  shoppingList?: EditShoppingListById['shoppingList']
  onSave: (data: UpdateShoppingListInput, id?: FormShoppingList['id']) => void
  error: RWGqlError
  loading: boolean
}

const ShoppingListForm = (props: ShoppingListFormProps) => {
  const onSubmit = (data: FormShoppingList) => {
    props.onSave(data, props?.shoppingList?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormShoppingList> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="startDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start date
        </Label>

        <DatetimeLocalField
          name="startDate"
          defaultValue={formatDatetime(props.shoppingList?.startDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="startDate" className="rw-field-error" />

        <Label
          name="endDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End date
        </Label>

        <DatetimeLocalField
          name="endDate"
          defaultValue={formatDatetime(props.shoppingList?.endDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="endDate" className="rw-field-error" />

        <Label
          name="numberOfPeople"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Number of people
        </Label>

        <NumberField
          name="numberOfPeople"
          defaultValue={props.shoppingList?.numberOfPeople}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="numberOfPeople" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ShoppingListForm
