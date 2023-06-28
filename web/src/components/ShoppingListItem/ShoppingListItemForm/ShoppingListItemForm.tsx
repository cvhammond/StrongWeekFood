import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditShoppingListItemById,
  UpdateShoppingListItemInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormShoppingListItem = NonNullable<
  EditShoppingListItemById['shoppingListItem']
>

interface ShoppingListItemFormProps {
  shoppingListItem?: EditShoppingListItemById['shoppingListItem']
  onSave: (
    data: UpdateShoppingListItemInput,
    id?: FormShoppingListItem['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const ShoppingListItemForm = (props: ShoppingListItemFormProps) => {
  const onSubmit = (data: FormShoppingListItem) => {
    props.onSave(data, props?.shoppingListItem?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormShoppingListItem> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="shoppingListId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Shopping list id
        </Label>

        <NumberField
          name="shoppingListId"
          defaultValue={props.shoppingListItem?.shoppingListId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="shoppingListId" className="rw-field-error" />

        <Label
          name="ingredientId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ingredient id
        </Label>

        <NumberField
          name="ingredientId"
          defaultValue={props.shoppingListItem?.ingredientId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="ingredientId" className="rw-field-error" />

        <Label
          name="amount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Amount
        </Label>

        <TextField
          name="amount"
          defaultValue={props.shoppingListItem?.amount}
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

export default ShoppingListItemForm
